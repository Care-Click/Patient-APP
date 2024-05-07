import React, { useState, useEffect } from "react";
import axios from "../assets/axios_config.js";
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import config from "../assets/url.js";

interface Doctor {
  id: string;
  fullName: string;
  profile_picture: string;
}

interface Patient {
  id: string;
  fullName: string;
  profile_picture: string;
}

interface Message {
  id: string;
  content: string;
  doctor: Doctor;
  patient: Patient|null;
  createdAt : string;
  toPatientId : number;
  
}

const Messages = () => {
  const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const [showInput,setShowInput] = useState(false)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${config.localhost}/api/messages/messagesPatient`
      );
      setMessagesReceived(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleJoinConversation = async (doctorId: string) => {
    console.log("Joining conversation with doctor ID:", doctorId);
    if (pollingInterval) {
      clearInterval(pollingInterval);  
    }

    try {
      const { data } = await axios.get(
        `${config.localhost}/api/messages/messageP/${doctorId}`
      );
      setMessageList(data.messages);
      setDoctor(data.doctor);
      setPatient(data.patient);
      setShowScroll(!showScroll);
      setShowInput(!showInput);

      const newInterval = setInterval(async () => {
        const { data } = await axios.get(
          `${config.localhost}/api/messages/messageP/${doctorId}`
        );
        setMessageList(data.messages);  
      }, 15000);  

      setPollingInterval(newInterval);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  

  const sendMessageToDoctor = async () => {
    if (!doctor) return;
    try {
      const response = await axios.post(
        `${config.localhost}/api/messages/patient/send`,
        {
          doctorId: doctor.id,
          content: newMessageContent,
        }
      );
      setMessageList((list) => [...list, response.data]);
      setNewMessageContent("");
      setShowScroll(!showScroll)
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.msgcont}>
      {messagesReceived.map((msg, i) => (
        <Pressable key={i} onPress={() => handleJoinConversation(msg.doctor.id)}>
          <View style={styles.messageContainer}>
          <Image
  style={{ width: 50, height: 50 }}
  source={{ uri: msg.doctor.profile_picture }}
/>
            <Text>{msg.content}</Text>
            <Text style={styles.messageText}>{moment(msg.createdAt).format('DD/MM HH:mm')}</Text>
          </View>
        </Pressable>
      ))}
      { showScroll && <ScrollView style={styles.scrollView}>
      <View style={styles.chatBox}>
        {messageList.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageContainer,
              {
                justifyContent: msg.toPatientId !== null ? "flex-end" : "flex-start",
              },
            ]}
          >
            <Image
              style={styles.avatar}
              source={{ uri: msg.toPatientId !== null ? doctor?.profile_picture : patient?.profile_picture }}
            />
            <View
              style={[
                styles.messageBubble,
                {
                  backgroundColor: msg.toPatientId !== null ? "#BEE3F8" : "#F7FAFC",
                },
              ]}
            >
              <Text style={styles.messageText}>{msg.content}</Text>
              <Text style={styles.messageText}>{moment(msg.createdAt).format('DD/MM HH:mm')}</Text>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>}

      { showInput && <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessageContent}
          onChangeText={(text) => setNewMessageContent(text)}
        />
        <Pressable onPress={sendMessageToDoctor}>
          <Text>Send</Text>
        </Pressable>
      </View>}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  msgcont :{
    marginTop : 70,
    //marginRight:80,
  
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  chatBox: {
    padding: 20,
    borderColor: "#AAD9BB",
    borderWidth: 1,
    borderRadius: 8,
  },
  scrollView: {
    //flex: 1,
    backgroundColor: '#F7F7F7',
    
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    marginTop :7,
    width: 270,
    
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageBubble: {
    padding: 8,
    borderRadius: 8,
    flexShrink: 1,
  },
  messageText: {
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    width :'auto'
  },
  input: {
    //flex: 1,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default Messages;
