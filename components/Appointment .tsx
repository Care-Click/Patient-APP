import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import RNPickerSelect from 'react-native-picker-select';
interface Appointment {
  id: number;
  dateTime: string;
  PatientName: string;
  description: string;
  createdAt: string;
  doctorId: number;}
const AppointmentCalendar = () => {
  useEffect(()=>{
getDocApp()
  },[])
  const getDocApp=async()=>{
    try {
      const { data } = await axios.get(
        `http://192.168.137.157:3000/api/appointment/getAppointements/1`
      );
      
      setAppointments(data);
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
     
    }
  }
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedHour, setSelectedHour] = useState(null);

  
  const handleTimeChange = (selectedtime:any) => {
    let time=""
    for (let index = 0; index < appointments.length; index++) {
      time=appointments[index].dateTime;
      time=time.substring(11,13)
      ;
      if(time==selectedtime)
        console.log("haha");
      return
    }console.log("😂😂",parseInt(time))
    console.log("💰💰",selectedtime);
    setSelectedHour(selectedHour);
  };
  const handleHourPress = (hour: any) => {
    setSelectedHour(hour);
    console.log(selectedHour);
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
      {selectedDate &&  <Text style={styles.lab}>{selectedDate} </Text>}
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
  }
});

export default AppointmentCalendar;
