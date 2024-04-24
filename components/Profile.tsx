import React ,{useState}from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, FontAwesome5,AntDesign } from '@expo/vector-icons';

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState<string>('Personal Info');

    const handleTabPress = (tabName :string) => {
      setSelectedTab(tabName);
      
    };

    return (
        <View>
            <View>
                <Image
                    style={styles.logo}
                    source={require("./assets/logo.png")}
                />
                <Text style={styles.name}>CareClick</Text>
            </View>
            <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[selectedTab === 'Personal Info' && styles.selectedTab]}
          onPress={() => handleTabPress('Personal Info')}
        >
          <Text style={styles.tabText}>Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[selectedTab === 'Medical Info' && styles.selectedTab]}
          onPress={() => handleTabPress('Medical Info')}
        >
          <Text style={styles.tabText}>Medical Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[selectedTab === 'Medical Record' && styles.selectedTab]}
          onPress={() => handleTabPress('Medical Record')}
        >
          <Text style={styles.tabText}>Medical Record</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ selectedTab === 'Reviews' && styles.selectedTab]}
          onPress={() => handleTabPress('Reviews')}
        >
          <Text style={styles.tabText}>Reviews</Text>
        </TouchableOpacity>
      </View>
      {/* Render content based on the selected tab */}
    </View>
            <View style={styles.iconContainer}>
                <View style={styles.iconWrapper}>
                <AntDesign name="user" size={35} color="#1DBED3" />
                <Text style={styles.iconText}>Omar Boubaker</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <FontAwesome name="phone" size={35} color="#1DBED3" />
                    <Text style={styles.iconText}>+21656361588</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <FontAwesome5 name="birthday-cake" size={33} color="#1DBED3" />
                    <Text style={styles.iconText}>24/10/2000</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <Feather name="mail" size={35} color="#1DBED3" />
                    <Text style={styles.iconText}>omar.boubakker00@gmail.com</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <MaterialIcons name="place" size={35} color="#1DBED3" />
                    <Text style={styles.iconText}>Akouda-4022</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 200,
        marginLeft: 250,
        marginTop: -30
    },
    name: {
        marginLeft: 190,
        marginTop: -80,
        color: "#F26268",
        fontSize: 25,
        paddingBottom: 60
    },
    iconContainer: {
        backgroundColor: "#F0FFFF",
        width: 380,
        height: 380,
        marginLeft: 5,
        marginTop: 1,
        borderWidth: 1,
        borderColor: '#1DBED3',
        padding: 10,
        borderRadius: 10,
    },
    button: {
        marginTop: 15,
        marginLeft: 100,
        height: 50,
        width: 200,
        backgroundColor: '#F26268',
        borderRadius: 10,
        elevation: 3, // for Android
    },
    buttonText: {
        marginTop: 18,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding:10,
    },
    iconText: {
        marginLeft: 35,
        fontSize: 18,
        color: 'black', // Adjust the color as needed
    },container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5,
        marginBottom: 30, // Adjust as needed
      },
      navbar: {
        
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height:30,
        marginBottom: 10, 
        
      },
      selectedTab: {
        backgroundColor: '#C0E8E8',
        height:20,
        borderRadius: 10,
      },
      tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1DBED3',
      },
})