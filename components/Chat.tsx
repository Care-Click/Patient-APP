import { StyleSheet, View, Text, Button, TextInput, Image, Pressable } from 'react-native';
import React , {useEffect} from 'react'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import * as yup from "yup";
import io from "socket.io-client"

const Chat = () => {



const socket = io("http://192.168.10.21:3001")

 const  sendMessage = async==  ()=>{}

socket.on("send_message",  axios.post()
   // world
);

const schema = yup.object().shape({
  Message: yup.string().required(" messages cannot be empty "),
})



type FormData = {
  Message :string
}

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: yupResolver(schema),
  defaultValues: {
    Message: ""
  },
})


  return (
    <View style={styles.maincontainer} >
      <Controller
          control={control}
          rules={{
            required: { value: true, message: "Email is required" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Message"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name="Message"
        />
        {errors.Message && <Text>{errors.Message.message}</Text>}
    </View>
  )
}

export default Chat


const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
})