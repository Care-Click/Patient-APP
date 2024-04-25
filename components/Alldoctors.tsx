import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList,Image, TextInput, Button, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';


const Alldoctors = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async (speciality) => {
    try {
      const response = await axios.get(`http://192.168.1.108:3001/api/patients/search/${speciality}`);
      setDoctors(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const searchDoctors = () => {
    fetchDoctors(searchTerm);
  };
  const renderDoctorItem = ({ item }) => (
  <TouchableOpacity style={styles.doctorItem}>
       <Image source={{ uri: item.profile_picture }} style={styles.doctorImage} />
      
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.FullName}</Text>
        <Text style={styles.doctorSpecialty}>{item.MedicalExp.speciality}</Text>
      </View>
      <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('Doctordetail', { doctorId: item.id })}>
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
      <FontAwesome name="phone" size={24} color="red" style={styles.phoneIcon} />
      <MaterialCommunityIcons name="message-processing-outline" size={24} color="red" style={styles.phoneIcon}/>
  
    </TouchableOpacity>
    )
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by specialty..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={searchDoctors} />
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  doctorContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 2,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContentContainer: {
    padding: 10,
  },
  doctorItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  doctorInfo: {
    marginLeft: 10,
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    color: 'grey',
  },
  detailButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  detailButtonText: {
    color: '#4F8EF7',
    fontSize: 16,
  },
  phoneIcon: {
    marginHorizontal: 10,
  },
  
});
;

export default Alldoctors;