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
  const socket = io("ws://localhost:3000");

  const route = useRoute();
  const scrollRef = useRef();
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
      socket.emit("joinConversation",conversationId);
      getMessages()
      socket.on("newMessage", (data) => {
        setMessages(...messages,data)
      });
   }, []);
   useEffect(() => {
   
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
            style={
              msg.sender === "Doctor"
                ? styles.doctorMessageContainer
                : styles.patientMessageContainer
            }
          >
            {msg.sender === "Doctor" && (
              <Image
                source={{ uri: msg.conversation?.doctor.profile_picture }}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.messageText}>{msg.content}</Text>
            {msg.sender === "Patient" && (
              <Image
                source={{ uri: msg.conversation?.patient.profile_picture }}
                style={styles.profileImage}
              />
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
    marginBottom: 8,
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  patientMessageContainer: {
    marginBottom: 8,
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
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
