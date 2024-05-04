import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';

const Landing = () => {
  return (
    <View
     
    >
      <Image
        source={require("../assets/image/Capture1.PNG")} 
        style={styles.image}
      />
      <Text style={styles.header}>HOPE FOR HUMANITY</Text>
      <Text style={styles.subHeader}>Welcome to hope for humanity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 100, 
    height: 100, 
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default Landing;
