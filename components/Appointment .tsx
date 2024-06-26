import { useRoute } from "@react-navigation/native";
import axios from "../assets/axios_config";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import RNPickerSelect from "react-native-picker-select";
import config from "../assets/url";

interface Appointment {
  id: number;
  dateTime: string;
  PatientName: string;
  description: string;
  createdAt: string;
  doctorId: number;
}
const AppointmentCalendar = () => {
  const route = useRoute();
  const doctorId = route.params.doctorId
  const [name, setName] = useState("");
  useEffect(() => {
    getPatient();
    getDocApp();
  }, []);
  const getDocApp = async () => {
    try {
      const { data } = await axios.get(
        `${config.localhost}/api/appointment/getAppointements/${doctorId}`
      );
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  const getPatient = async () => {
    try {
      const { data } = await axios.get(
        `${config.localhost}/api/patients/getInfo`
      );
      setName(data.FullName);
    } catch (error) {
      console.log(error);
    }
  };
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedHour, setSelectedHour] = useState("");

  const [newMessageContent, setNewMessageContent] = useState("");

  const handleTimeChange = (selectedHour: any) => {
    setSelectedHour(selectedHour);
  };
  const handleHourPress = (hour: any) => {
    setSelectedHour(hour);
  };
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 8; i <= 18; i++) {
      options.push({ label: `${i} :00`, value: i });
    }
    return options;
  };
  const handleDateSelect = (date: any) => {
    let check = new Date(date.dateString);

    let day = check.getDay();
    if (day !== 0 && day !== 6) {
      setSelectedDate(date.dateString);
    } else {
      alert("weekEnd is not available for appointments.");
      setSelectedDate(null);
    }
  };
  const handlechange = async (e:any) => {
    e.preventDefault();
    try {
      let hour = "";
      if (parseInt(selectedHour) < 10) {
        hour = "0" + selectedHour;
      } else {
        hour = selectedHour;
      }
      let PatientName=name
      let dateTime = selectedDate + "T" + hour + ":00:00Z";
      const response = await axios.post(
        `${config.localhost}/api/appointment/addAppointement/${doctorId}`,
        { dateTime, description: newMessageContent, PatientName }
      );
      alert("New appointment created:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.base}>
        <Image
          style={styles.logo}
          source={require("../assets/image/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
      </View>
      <ScrollView>
        <Calendar onDayPress={handleDateSelect} markingType={"period"} />
        <Text style={styles.label}>Selected Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={selectedDate}
        />
        {/* {selectedDate &&  <Text style={styles.lab}>{selectedDate} </Text>} */}
        <Text style={styles.label}>Select Time in Hours:</Text>
        <RNPickerSelect
          items={generateTimeOptions()}
          onValueChange={handleTimeChange}
          style={pickerSelectStyles}
        />
        <View>
          <Text style={styles.label}>description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={newMessageContent}
            onChangeText={(text) => setNewMessageContent(text)}
          />
        </View>

        <Pressable onPress={(e) => handlechange(e)}>
          <Text style={styles.submit}>Submit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    width: "80%",
    marginTop: 20,
    margin: 20,
  },
});
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  base: {
    marginRight: 40,
  },
  name: {
    marginLeft: 70,
    marginTop: -50,
    color: "#F26268",
    fontSize: 25,
    paddingBottom: 60,
  },
  input: {
    marginLeft: 20,
    alignItems: "center",
    width: 320,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submit: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    marginLeft: 140,
    backgroundColor: "#1DBED3",
  },
  label: {
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppointmentCalendar;
