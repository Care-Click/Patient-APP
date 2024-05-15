import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput, Button, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import axios from '../assets/axios_config';
import { FontAwesome } from '@expo/vector-icons';
import config from '../assets/url';

interface Doctor {
  id: number;
  FullName: string;
  profile_picture: string;
}

const Alldoctors = ({ navigation }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async (speciality: string) => {
    try {
      if (speciality) {
        const response = await axios.get(`${config.localhost}/api/patients/search/${speciality}`);
        setDoctors(response.data);
      }
      else setDoctors([]);
    } catch (error) {
      console.log(error);
    }
  };

  const searchDoctors = () => {
    fetchDoctors(searchTerm);
  };
  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Doctordetail', { doctorId: item.id })}style={styles.doctorItem}>
      <View style={styles.detail} >
      <Image source={{ uri: item.profile_picture }} style={styles.doctorImage} />
      <Text   numberOfLines={1} ellipsizeMode="tail" style={styles.doctorName}>{item.FullName}</Text>
     
      
      <FontAwesome name="phone" size={24} color="red" style={styles.phoneIcon} />
      
      </View>
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
      <View style={styles.button}>
      <Button  title="Search" onPress={searchDoctors}  />
      </View>
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
    backgroundColor: '#f0f0f0',
  },
  listContentContainer: {
    padding: 10,
  },
  doctorItem: {
    backgroundColor: '#fff',
    borderRadius: 17,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:250
  },

  doctorContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,

  },
  searchInput: {
    height: 40,
    width:250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  doctorImage: {
    width: 10,
    height: 10,
    borderRadius: 25,
  },
  doctorInfo: {
    marginLeft: 2,
    flex: 1,

  },
  doctorName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop : 10,
    maxWidth:150,
  },
  doctorSpecialty: {
    color: 'grey',
  },
  detailButton: {
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
   
    paddingHorizontal: 10
  },
  detailButtonText: {
    color: '#4F8EF7',
    fontSize: 16,
  },
  phoneIcon: {
    
    marginTop : 10
  },

  detail : {
    flex:1 ,
    flexDirection : 'row',
    justifyContent :"space-around",
    alignContent: "center",
    maxWidth : 300
  }

});
;

export default Alldoctors;