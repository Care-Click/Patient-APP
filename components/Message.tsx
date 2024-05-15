import React, { useState, useEffect } from "react";
import axios from "../assets/axios_config.js";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import config from "../assets/url.js";

interface Doctor {
  fullName: string;
  profile_picture: string;
}
interface patient {
  fullName: string;
  profile_picture: string;
}
const Messages = ({ navigation }: any) => {
  const [conversations, setConversations] = useState([
    { doctor: { profile_picture: "", FullName: "" },patient: { profile_picture: "", FullName: "" } },
  
  ]);

  useEffect(() => {
    getPatientConversations();
  }, []);
  const getPatientConversations = async () => {
    try {
      const response = await axios.get(
        `${config.localhost}/api/patients/getInfo`
      );

      const { data } = await axios.get(
        `${config.localhost}/api/conversations/${response.data?.id}/Allconversations`
      );

      setConversations(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.msgcont}>
        {conversations.length !== 0 ? (
          conversations.map((conversation, i) => (
            <Pressable
              key={i}
              onPress={() => {
              
                
                navigation.navigate("chat", {
                  conversationId: conversation.id,
                  profileDoc:conversation.doctor.profile_picture,
                  profilePat: conversation.patient.profile_picture,
                });
              }}
            >
              <View style={styles.messageContainer}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: conversation?.doctor.profile_picture }}
                />
                <Text>{conversation.doctor.FullName}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text>not conversation was found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  msgcont: {
    marginTop: 70,
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
    backgroundColor: "#F7F7F7",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    marginTop: 7,
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
    width: "auto",
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
