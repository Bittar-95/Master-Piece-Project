import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { Actions } from "react-native-router-flux";

export default function App() {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../Public/tashashni_logo.png")}
          style={{ width: 156, height: 49, position: "absolute", top: 36 }}
        ></ImageBackground>

        <ImageBackground
          source={require("../Public/tash-bg.png")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 115
          }}
        ></ImageBackground>
        <View>
          <Text
            style={{
              color: "#086cdd",
              fontSize: 28,
              marginTop: 398,
              paddingLeft: 30,
              paddingRight: 30
            }}
          >
            CHEER YOURSELF UP!
          </Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            Actions.OurTrip();
          }}
        >
          <Text style={styles.buttons}>Get Trip</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={async () => {
            await AsyncStorage.removeItem("buildItems");
            Actions.BuildYouTrip();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor: "#033e8c",
              color: "white",
              fontSize: 14,
              marginTop: 11,
              width: 214,
              borderWidth: 2,
              borderTopLeftRadius: 5,
              borderBottomRightRadius: 5,
              borderColor: "#0455bf"
            }}
          >
            Build Your Trip
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#033e8c",
    color: "white",
    fontSize: 14,
    marginTop: 11,
    width: 214,
    borderWidth: 2,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "#0455bf"
  }
});
