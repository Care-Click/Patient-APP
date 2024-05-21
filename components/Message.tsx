import React, { useState, useEffect } from "react";
import axios from "../assets/axios_config.js";
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from "react-native";
import config from "../assets/url.js";

const Messages = ({ navigation }) => {
  const [conversations, setConversations] = useState([
    { doctor: { profile_picture: "", FullName: "" }, patient: { profile_picture: "", FullName: "" } },
  ]);

  useEffect(() => {
    getPatientConversations();
  }, []);

  const getPatientConversations = async () => {
    try {
      const response = await axios.get(`${config.localhost}/api/patients/getInfo`);
      const { data } = await axios.get(`${config.localhost}/api/conversations/${response.data?.id}/Allconversations`);
      setConversations(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/image/logo.png")} />
        <Text style={styles.name}>CareClick</Text>
      </View>
      <ScrollView contentContainerStyle={styles.msgcont}>
        {conversations.length !== 0 ? (
          conversations.map((conversation, i) => (
            <Pressable
              key={i}
              style={styles.messagePressable}
              onPress={() => {
                navigation.navigate("chat", {
                  conversationId: conversation.id,
                  profileDoc: conversation.doctor.profile_picture,
                  profilePat: conversation.patient.profile_picture,
                });
              }}
            >
              <View style={styles.messageContainer}>
                <Image style={styles.avatar} source={{ uri: conversation?.doctor.profile_picture }} />
                <Text style={styles.doctorName}>{conversation.doctor.FullName}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noConversationText}>No conversation was found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  name: {
    color: "#F26268",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -10,
  },
  msgcont: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messagePressable: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  noConversationText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});

export default Messages;
