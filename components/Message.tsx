import React, { useState, useEffect } from "react";
import axios from "../assets/axiosConfig.js";
// import axios from 'axios'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";

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
  patient: Patient;
}

const Messages = () => {
  const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [newMessageContent, setNewMessageContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.108:3000/api/messages/messagesPatient"
      );
      setMessagesReceived(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleJoinConversation = async (doctorId: string) => {
    console.log(doctorId);
    try {
      const { data } = await axios.get(
        `http://192.168.1.108:3000/api/messages/messageP/${doctorId}`
      );
      console.log(data);
      setMessageList(data.messages);
      setDoctor(data.doctor);
      setPatient(data.patient);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessageToDoctor = async () => {
    if (!doctor) return;
    try {
      const response = await axios.post(
        "http://192.168.1.108:3000/api/messages/patient/send",
        {
          doctorId: doctor.id,
          content: newMessageContent,
        }
      );
      setMessageList((list) => [...list, response.data]);
      setNewMessageContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <View style={styles.container}>
      {messagesReceived.map((msg, i) => (
        <View key={i}>
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: msg.doctor.profile_picture }}
            />
            <Pressable onPress={() => handleJoinConversation(msg.doctor.id)}>
              <Text>{msg.content}</Text>
            </Pressable>
          </View>

          <View style={styles.chatBox}>
            {messageList.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.messageContainer,
                  {
                    justifyContent:
                      msg.fromPatientId !== null ? "flex-end" : "flex-start",
                  },
                ]}
              >
                <View
                  style={[
                    msg.fromPatientId !== null
                      ? styles.messageRowReverse
                      : styles.messageRow,
                    styles.maxWidth,
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        msg.fromPatientId !== null
                          ? doctor.profile_picture
                          : patient.profile_picture,
                    }}
                    style={styles.avatar}
                  />
                  <View
                    style={[
                      styles.messageBubble,
                      {
                        backgroundColor:
                          msg.fromPatientId !== null ? "#BEE3F8" : "#F7FAFC",
                      },
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.content}</Text>
                    {/* <Text>{moment(msg.createdAt).format('DD/MM HH:mm')}</Text> */}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  chatBox: {
    padding: 16,
    borderColor: "#AAD9BB",
    borderWidth: 1,
    borderRadius: 8,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageRowReverse: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  maxWidth: {
    maxWidth: "100%",
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
    flexShrink: 1, // This helps in case the text is too long
  },
  messageText: {
    marginBottom: 0,
  },
});

export default Messages;
