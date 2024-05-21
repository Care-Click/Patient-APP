import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import io from "socket.io-client";
import config from "../assets/url";

interface Message {
  id: number;
  sender: string;
  content: string;
}

const Chat = ({ navigation }: any) => {
  const route = useRoute();
  const scrollRef = useRef<ScrollView>(null);
  const { conversationId, profileDoc, profilePat } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const newSocket = io(config.localhost);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("joinConversation", conversationId);
    });

    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [conversationId]);

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `${config.localhost}/api/conversations/${conversationId}/messages`
      );
      setMessages(data);
      scrollToBottom();
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
        conversationId: conversationId,
        sender: "Patient",
        createdAt: new Date(Date.now()),
        content: newMessage,
      };
      socket.emit("sendMessage", messageSocket);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "medium"}
      keyboardVerticalOffset={70}
      style={{ flex: 1 }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/image/logo.png")}
          />
          <Text style={styles.name}>CareClick</Text>
        </View>
        <ScrollView ref={scrollRef} style={styles.scrollView}>
          {messages.map((msg: Message, i) => (
            <View key={i}>
              {msg.sender === "Doctor" && (
                <View style={styles.containerDoc}>
                  <Image
                    source={{ uri: profileDoc }}
                    style={styles.profileImage}
                  />
                  <View style={styles.doctorMessageContainer}>
                    <Text style={styles.messageText}>{msg.content}</Text>
                  </View>
                </View>
              )}
              {msg.sender === "Patient" && (
                <View style={styles.containerPat}>
                  <Image
                    source={{ uri: profilePat }}
                    style={styles.profileImage}
                  />
                  <View style={styles.patientMessageContainer}>
                    <Text style={styles.messageText}>{msg.content}</Text>
                  </View>
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
          <Pressable onPress={handleSubmit} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  name: {
    color: "#F26268",
    fontSize: 25,
    fontWeight: "bold",
  },
  scrollView: {
    maxHeight: "75%",
  },
  containerDoc: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  containerPat: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  doctorMessageContainer: {
    flexDirection: "row",
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  patientMessageContainer: {
    flexDirection: "row",
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    color: "#333333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    padding: 8,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 10,
    backgroundColor: "#F26268",
    borderRadius: 8,
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Chat;
