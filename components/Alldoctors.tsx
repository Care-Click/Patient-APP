import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Alldoctors = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async (specialty) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/patients/search/${specialty}`);
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchDoctors = () => {
    fetchDoctors(searchTerm);
  };

  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Doctordetail', { doctorId: item.id })}> {/* Navigate to Doctordetail and pass the doctor's ID */}
      <View style={styles.doctorContainer}>
        <Text>{item.FullName}</Text>
      </View>
    </TouchableOpacity>
  );

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
});

export default Alldoctors;
