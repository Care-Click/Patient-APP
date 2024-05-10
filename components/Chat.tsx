import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import io from "socket.io-client";
import config from "../assets/url";

  const Chat = ({ navigation }:any) => {
  const socket = io("http://192.168.1.12:3000");

  const route = useRoute();
  const scrollRef = useRef();
  const { conversationId,profileDoc,profilePat } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getMessages()
    socket.on('connect', () => {
      console.log("connected")
      socket.emit("joinConversation",conversationId);
    })
      socket.on("newMessage", (data) => {
        
        console.log(data);
        
        setMessages([...messages,data])
      });
   }, []);


  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `${config.localhost}/api/conversations/${conversationId}/messages`
      );
      
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {

    if (newMessage.trim() === "") {
      return;
    }
    try {
      const messageSocket = {
        conversationId:conversationId ,
        sender: "Patient",
        createdAt:  new Date(Date.now()),
        content: newMessage,
      };
      socket.emit("sendMessage",messageSocket);
      await axios.post(`${config.localhost}/api/messages`, messageSocket);
      setNewMessage("");
      getMessages(); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView ref={scrollRef}>
        {messages.map((msg, i) => (
          <View
            key={i}
            >
            {msg.sender === "Doctor" && (<View  style={styles.doctorMessageContainer}>
              <Image
                source={{ uri: profileDoc }}
                style={styles.profileImage}
              />
              <Text style={styles.messageText}>{msg.content}</Text>

            </View>
            )}
                {msg.sender === "Patient" && (
                  <View  style={styles.patientMessageContainer}>
              <Image
                source={{ uri: profilePat}}
                style={styles.profileImage}
              />
              <Text style={styles.messageText}>{msg.content}</Text>
              </View>
            
            )}
               
        
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Pressable onPress={handleSubmit}>
          <Text>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  doctorMessageContainer: {
    flex:1,
    marginBottom: 8,
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems:"flex-start"

  },
  patientMessageContainer: {
    flex:1,
    marginBottom: 8,
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems:"flex-end"
  },
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  messageText: {
    fontSize: 16,
    color: "#333333",
  },
  input: {
    flex: 1,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingVertical: 8,
  },
});

export default Chat;
