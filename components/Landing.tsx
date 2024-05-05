import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";


const StyledButton = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/image/Capture1.png")}
        style={styles.image}
      >
        <Image
          style={styles.logo}
          source={require("../assets/image/logo.png")}
        />
        <View style={styles.overlay}>
          <Text style={styles.header}>Emergency Care, Instantly</Text>
          <Text style={styles.subHeader}>Welcome to CareClick</Text>

          <StyledButton
            title="Enter Here"
            onPress={() => navigation.navigate("Signin")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    backgroundColor: "rgba(250, 55, 40, 0.7)",
    width: 190,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: -60,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 100,
    marginTop: -360,
    zIndex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      "linear-gradient(0.01deg, #1DBED3 -1%, rgba(10, 107, 158, 0.801566) 59.1%, rgba(52, 167, 81, 0) 301.87%)", // Red color overlay with 50% opacity
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 9,
  },
  subHeader: {
    fontSize: 26,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 40,
    marginVertical: 33,
    marginLeft: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Landing;
