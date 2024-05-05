import { StyleSheet, View, Text, Button, TextInput, Image, Pressable } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import YupPassword from 'yup-password'
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from "yup";
import axios from 'axios';
import config from '../assets/url.js';

YupPassword(yup)

function Signin({ navigation }: any) {

  const schema = yup.object().shape({
    Email: yup.string().email("Invalid email format").required("This field is required"),
    Password: yup.string().required("This field is required")
  })

  type FormData = {
    Email: string
    Password: string
  }

  interface inputs {
    Email: string;
    Password: string;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  })

  const onSubmit = async (inputs: inputs) => {
    try {
      const { data } = await axios.post(`${config.localhost}/api/patients/signin`, {
        email: inputs.Email,
        password: inputs.Password
      }) 
      await AsyncStorage.setItem('token', data.token);
      
      navigation.navigate("Patient")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.maincontainer}>
      
        <View style={styles.logocontainer}>
          <Image
            style={styles.logo}
            source={require("../assets/image/logo.png")}
          />
          <Text style={styles.name}>CareClick</Text>
        </View>

        <View>
          <Text style={styles.title}>Sign in to your account </Text>
        </View>

        <Text style={styles.Email}>Email</Text>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Email is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="Email"
        />
        {errors.Email && <Text style={styles.erroremail}>{errors.Email.message}</Text>}

        <View style={styles.passwordcontainer}>
          <Text style={styles.password}>
            Password
          </Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                secureTextEntry={true}
              />
            )}
            name="Password"
          />
          {errors.Password && <Text style={styles.errorpassword}>{errors.Password.message}</Text>}
        </View>
      <View style={styles.button} >
        <Pressable  onPress={handleSubmit(onSubmit)} >
          <Text  style={styles.buttontext}>Submit</Text>
        </Pressable>
        
      </View>
        <View style={styles.position}>
          <Text style={styles.account}>
            Don't have an account? <Pressable onPress={() => { navigation.navigate("Signup") }} ><Text style={styles.navigation}>SIGN UP</Text></Pressable>
          </Text>
        </View>
        
    </View>
  )
}

export default Signin

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 200,
    marginLeft: 130,
    marginTop: -30
  },
  title: {
    marginLeft: 50,
    marginTop: -40,
    fontSize: 25,
  },
  Email: {
    color: "grey",
    marginRight: 240,
    marginTop: 30
  },
  name: {
    marginLeft: 80,
    marginTop: -80,
    color: "#F26268",
    fontSize: 20,
    paddingBottom: 60
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    width: 300,
    color: "black",
  },
  position: {
    marginTop: 50,
    marginLeft: 10,
    
    

  },
  account: {
    color: "#888888",
    fontSize: 20,
  },
  password: {
    marginLeft: 25,
    color: "grey",
  },
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  
    borderColor:"black",
    borderStyle:"solid",
    
    
    
  },
  passwordcontainer: {
    marginTop: 20
  },
  errorpassword: {
    marginLeft: 100,
    color : "red"
  },
  erroremail :{
color:"red"
  },

  button: {
    marginTop : 50,
    backgroundColor: "#1DBED3",
    width : 200,
    height : 25,
    borderRadius : 30

  },

  buttontext :{
    textAlign : "center",
    marginTop : 6,
    color : "white"
    
  },

  navigation : {
    marginTop: "auto",
    fontSize: 17,
    color:"#1DBED3"
  },

  logocontainer : {
  marginBottom : 40 , 
  marginRight : 50

  }



  
});