import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Pressable, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import RNPickerSelect from 'react-native-picker-select';
import config from "../assets/url";

interface Appointment {
  id: number;
  dateTime: string;
  PatientName: string;
  description: string;
  createdAt: string;
  doctorId: number;}
const AppointmentCalendar = () => {
  const route = useRoute();
  const doctorId  = route.params.doctorId ;


  useEffect(()=>{
getDocApp()
  },[])
  const getDocApp=async()=>{
    try {
      const { data } = await axios.get(
        `${config.localhost}/api/appointment/getAppointements/${doctorId}`
      );
      
      setAppointments(data);
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
     
    }
  }
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedHour, setSelectedHour] = useState("");

  const [newMessageContent, setNewMessageContent] = useState("");
  
  const handleTimeChange = (selectedHour:any) => {
   
   
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
  const handlechange=async (e)=>{
    e.preventDefault();
    try {
let hour=""
if (parseInt(selectedHour)<10) {
  hour ="0"+selectedHour
}
else{
  hour=selectedHour
}
let dateTime=selectedDate+"T"+hour+':00:00Z'

let PatientName="Amine laarif"

      const response = await axios.post(`${config.localhost}/api/appointment/addAppointement/${doctorId}`,{dateTime,description:newMessageContent,PatientName} )
      alert('New appointment created:', response.data);
 
    } 
    catch (error) {
      console.error('Error creating appointment:', error);
    }
  }
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>Patient Name: {item.PatientName}</Text>
      <Text>Date and Time: {new Date(item.dateTime).toLocaleString()}</Text>
      <Text>Description: {item.description}</Text>
    </View>
  );
  return (
    <View>
      <Calendar onDayPress={handleDateSelect} markingType={"period"} style={styles.calender}/>
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
       <View style={{ flex: 1 }}>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    <Text style={styles.label}>description:</Text>
   
    <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessageContent}
          onChangeText={(text) => setNewMessageContent(text)}
        />
         <Pressable onPress={(e)=>handlechange(e)}>

<Text   style={styles.submit}>Submit</Text>
</Pressable >
    </View>
    
  );
  
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',

   
    width: '80%',
    marginTop:20,
    margin:20
  }})
const styles = StyleSheet.create({
  input: {
    marginLeft:20,
    alignItems:"center",
    width:320,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    
  },
  submit:{
    alignItems:"center",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
     width:100,
    marginLeft:140,
    backgroundColor: "#1DBED3"
  },
  calender:{
    margin:20
  },
  label: {
    marginLeft:15,
    fontWeight: 'bold',
    marginTop:35,
  },
  lab: {
    marginLeft:15,
    fontWeight: 'bold',
    marginTop:15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  hoursContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  hourButton: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
  },
  hourText: {
    fontSize: 10,
    color: "black",
  },
  button : {

  }
});

export default AppointmentCalendar;
