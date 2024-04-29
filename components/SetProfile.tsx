import { StyleSheet, View, Text,Button , TextInput, Image ,Pressable, ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import { useState } from 'react';
import YupPassword from 'yup-password'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import * as yup from "yup";
import axios from 'axios';

YupPassword(yup)



 function Signin({navigation}:any) {

  interface inputs {
    email:string,
    password :string
  }

  const route = useRoute();
  const { email,password  } :inputs = route.params;
  const data = [
    { label: " male", value: "male" },
    { label: " female", value: "female" },
    { label: " others", value: "others" },
  ];


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [genre, setgenre] = useState("");
  const [loca, setLocation] = useState({
    longitude: 0,
    latitude: 0,
    place: {},
  });




  const reverseGeocode = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const reversedAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });
      setLocation({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
        place: {
          city: reversedAddress[0].city,
          country: reversedAddress[0].country,
          district: reversedAddress[0].district,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };


  const handleDateChange = (event: any, date: any) => {
    if (date) {
      setSelectedDate(date);
    }
  };


const schema = yup.object().shape({
  FullName:yup.string().required("this field is required"),
 PhoneNumber:yup.string().required("this field is required")
})


  type FormData = {
    PhoneNumber: string
    FullName: string
  }

  
  interface inputs {
    PhoneNumber: string
    FullName: string
  }


  const {
    control,
    handleSubmit,
    formState: { errors },
   
  } = useForm<FormData>({
    resolver:yupResolver(schema),
    defaultValues: {
      PhoneNumber: "",
      FullName: "",
    },
  })
  const onSubmit = async (inputs:inputs) => {
    console.log("😎😎😎", {
      email,
      password,
      selectedDate,
      FullName:inputs.FullName,
      phone_number:inputs.PhoneNumber,
      genre,
      location: loca,
    });
    try {
      const { data } = await axios.post(
        "http://192.168.1.21:3000/api/patients/signup",
        {
          email,
          password,
          date_of_birth:selectedDate,
          FullName:inputs.FullName,
          phone_number:inputs.PhoneNumber,
          Gender:genre,
          location: loca,
          profile_picture:""
        }
      );
      console.log(data);
      navigation.navigate("Signin")
    } catch (error) {
      console.log(error);
    }
 
  }

  return (
    <View style={styles.maincontainer}>
      <View >
        <Image
        style={styles.logo}
        source={require("../assets/image/logo.png")}
        />
       
        </View>

        <View >
        <Text style={styles.title} >Please Set your profile  </Text>
        </View>
        <Text style={styles.Email}>FullName</Text>
      <Controller
        control={control}
        rules={{
          required: {value:true, message :"This  field  is required" } , 
        
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="FullName"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="FullName"
      />
      {errors.FullName && <Text>{errors.FullName.message}</Text>}
      
      <View style={styles.passwordcontainer} >
      <Text style={styles.password}>
          PhoneNumber 
         </Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="PhoneNumber"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
           
          />
        )}
        name="PhoneNumber"
      />
        {errors.PhoneNumber && <Text style={styles.errorpassword} >{errors.PhoneNumber.message}</Text>}
</View>

     
       
       

       <View>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      </View>
     
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select gendre"
        value={genre}
        onChange={(item) => {
          setgenre(item.value);
        }}
      />

<Button title="Submit" onPress={handleSubmit(onSubmit)} />

<View style ={styles.position} >
      <Text style={styles.account}>
        Alraedy have an account?  <Pressable  onPress={()=>{navigation.navigate("Signin")}}   ><Text style={styles.navigation}>sign in</Text></Pressable>
       </Text>
       </View>
    </View>

    
  )
}
export default Signin

const styles = StyleSheet.create({
  logo: {
   width : 150,
   height : 200 ,
   marginLeft : 130,
   marginTop : -30
  },
  title : {
    marginLeft : 50,
    marginTop: -40,
    fontSize : 25,
  },
  Email : {
    color : "grey",
    marginRight : 240 ,
    marginTop : 30
  
  },
  name: {
    marginLeft : 80,
    marginTop : -80,
    color : "#F26268" , 
    fontSize : 20,
    paddingBottom : 60
  } , 
  input : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
     borderRadius : 20 , 
     width : 300 , 
    color : "black" ,
     
    
  },
  container : {
marginTop : 30
  } , 
container1 : {
  marginTop : 50
    },

 navigation : {
  color : "#1DBED3",
  fontSize : 15,
 } ,

 position : {
  marginTop : 50,
  marginLeft : 20
 },

 account : {
   color : "#888888",
   fontSize : 15,
 },

 password : {
 
  marginLeft : 15 ,
  color : "grey" ,
 },

 maincontainer:{
flex : 1 , 
justifyContent : "center",
alignItems:"center",
marginTop : 10

 },button: {
  marginTop: 15,
  marginLeft: 10,
  height: 50,
  width: 200,
  backgroundColor: '#F26268',
  borderRadius: 10,
  elevation: 3, // for Android
},
buttonText: {
  marginTop: 18,
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: 16,
  textAlign: 'center',
},

passwordcontainer :{
marginTop : 20
},
 
errorpassword : {
  marginLeft : 60
},

dropdown: {
  margin: 16,
  height: 50,
  width: 150,
  borderBottomColor: "gray",
  borderBottomWidth: 0.5,
},
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontSize: 16,
},
    
  });