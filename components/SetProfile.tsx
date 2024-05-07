import { StyleSheet, View, Text,Button , TextInput, Image ,Pressable,TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from 'react';
import YupPassword from 'yup-password'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import * as yup from "yup";
import axios from '../assets/axios_config';
import * as ImagePicker from "expo-image-picker";
import config from '../assets/url';

YupPassword(yup)



 function Setprofile({navigation}:any) {

  interface inputs {
    email:string,
    password :string
  }

  const route = useRoute();
  const { email,password  } :any = route.params;

  
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
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

      // If the user didn't cancel image picking
      if (result) {
        setSelectedImage(result.assets[0].uri); 
        return result.assets[0].uri; 
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
  const onSubmit = async (inputs:any) => {

    let formData = new FormData();
    formData.append('email',email)
    formData.append('password',password)
    formData.append('date_of_birth',selectedDate.toISOString())
    formData.append('FullName',inputs.FullName)
    formData.append('phone_number',inputs.PhoneNumber)
    formData.append('Gender',genre)
    formData.append('location',loca)
    formData.append('image', {
      uri: selectedImage,
      name: 'image.jpg',
      type: 'image/jpeg', // Adjust the type based on your image type
    });
    

    try {
      const { data } = await axios.post(
        `${config.localhost}/api/patients/signup`,
       formData,{ headers: { "Content-Type": "multipart/form-data" } }
      );
      navigation.navigate("Signin")
    } catch (error) {
      console.log(error);
    }
 
  }

  return (
    <View style={styles.container}>
    <Text style={styles.logoText}>CareClick</Text>
    <View style={styles.imageContainer}>
      <Text style={styles.titleText}>Please Set Your Profile</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}
      <TouchableOpacity onPress={handlePickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerButtonText}>Select Image</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Full Name</Text>
      <Controller
        control={control}
        rules={{ required: { value: true, message: "This field is required" } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="FullName"
      />
      {errors.FullName && <Text style={styles.errorText}>{errors.FullName.message}</Text>}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        rules={{ maxLength: 100, required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="PhoneNumber"
      />
      {errors.PhoneNumber && <Text style={styles.errorText}>{errors.PhoneNumber.message}</Text>}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Date of Birth</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={handleDateChange}
        style={styles.datePicker}
      />
    </View>
    <View style={styles.dropdownContainer}>
      <Dropdown
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Gender"
        value={genre}
        onChange={(item) => {
          setgenre(item.value);
        }}
        style={styles.dropdown}
      />
    </View>
    <Button title="Sign Up" onPress={handleSubmit(onSubmit)} style={styles.signupButton} />
    <Pressable onPress={() => navigation.navigate("Signin")} style={styles.signinLink}>
      <Text style={styles.signinText}>If you already have an account, </Text>
      <Text style={styles.signinText}>sign in</Text>
    </Pressable>
  </View>
  )
}
export default Setprofile

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'blue',
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  imagePickerButtonText: {
    color: 'white',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
    width: '80%',
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  datePicker: {
    width: '100%',
    marginTop: 10,
  },
  dropdownContainer: {
    width: '80%',
    marginBottom: 10,
  },
  dropdown: {
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  signupButton: {
    marginTop: 10,
    width: '80%',
  },
  signinLink: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signinText: {
    marginRight: 5,
  },
};