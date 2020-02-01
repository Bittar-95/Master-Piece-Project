import axios from "axios";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  AsyncStorage,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";

class BuildYourTrip extends Component {
  state = { data: [] };
  componentDidMount = () => {
    axios
      .get("http://192.168.43.188:9000/buildYourTrip")
      .then(({ data }) => {
        this.setState({ data: data });
      })
      .catch((error) => {
        if (error) alert(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../Public/tashashni_logo.png")}
          style={{ width: 156, height: 49, position: "absolute", top: 36 }}
        ></ImageBackground>
        <ScrollView style={{ marginTop: 125, width: 250, height: 200 }}>
          {this.state.data.map((bus) => {
            return bus.businesses.map((business, index) => (
              <TouchableOpacity
                onPress={() => {
                  //   console.log(business.items);
                  Actions.BuildYItem(business.items);
                }}
                key={index}
              >
                <View style={styles.flatView}>
                  <Image
                    style={styles.flatImage}
                    source={{
                      uri: `http://192.168.43.188:9000/${business.busIMG}`
                    }}
                  />
                  <Text style={styles.type}>{business.type}</Text>
                  <Text>{business.title}</Text>
                </View>
              </TouchableOpacity>
            ));
          })}
        </ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Actions.yourOwnTrip();
          }}
        >
          <View>
            <Text style={styles.buttons}>Your Own Trip</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default BuildYourTrip;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderColor: "#0455bf",
    fontWeight: "bold"
  },
  flatView: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    height: 200,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray"
  },
  flatImage: {
    width: "100%",
    height: "75%",
    borderColor: "gray",
    borderWidth: 1
  },
  type: {
    fontWeight: "bold",
    color: "gray"
  }
});
