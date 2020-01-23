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
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";

class BuildYourTrip extends Component {
  state = { data: [] };
  componentDidMount = () => {
    axios
      .get("http://192.168.1.105:9000/buildYourTrip")
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
        <View>
          {this.state.data.map((bus) => {
            return bus.businesses.map((x) => (
              <TouchableOpacity
                onPress={() => {
                  //   console.log(x.items);
                  Actions.BuildYItem(x.items);
                }}
              >
                <View>
                  <Text>{x.title}</Text>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: `http://192.168.1.105:9000/${x.busIMG}`
                    }}
                  />
                  <Text>{x.type}</Text>
                </View>
              </TouchableOpacity>
            ));
          })}
        </View>

        <Button
          title="Your Own Trip"
          onPress={() => {
            Actions.yourOwnTrip();
          }}
        />
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
  }
});
