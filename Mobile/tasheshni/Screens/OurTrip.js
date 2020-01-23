import React, { Component } from "react";
import axios from "axios";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Keyboard,
  TextInput,
  CheckBox,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
class OutTrip extends Component {
  state = {
    car: false,
    eat: false,
    entertainment: false,
    budget: 0,
    eatBU: 0,
    enterBU: 0,
    tranBU: 0,
    bussiness_entertainment: [],
    bussiness_restaurants: [],
    currentLocation: null
  };

  _getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      alert("Permission to access location was denied");
    } else {
      let { coords } = await Location.getCurrentPositionAsync();
      this.setState({ currentLocation: coords });
    }
  };

  distance = (lat1, lon1, lat2, lon2) => {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist * 0.2;
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Your Budget"
          keyboardType={"numeric"}
          onChange={(event) => {
            this.setState({
              eatBU: event.nativeEvent.text * 0.4,
              enterBU: event.nativeEvent.text * 0.4,
              tranBU: event.nativeEvent.text * 0.2
            });
          }}
        />
        <Button
          title="Find Best Trip"
          onPress={async () => {
            if (!this.state.eat) {
              axios
                .get(
                  `http://192.168.1.105:9000/getTripsRestaurant?budget=${this.state.eatBU}`
                )
                .then(({ data }) => {
                  this.setState({ bussiness_restaurants: data });
                })
                .catch((error) => {
                  alert(error);
                });
            } else {
              this.setState({
                bussiness_restaurants: [],
                enterBU: this.state.eatBU
              });
            }
            if (this.state.car) {
              await this._getLocation();
            }
            if (!this.state.entertainment) {
              axios
                .get(
                  `http://192.168.1.105:9000/getTripsEntertainment?budget=${this.state.enterBU}`
                )
                .then(({ data }) => {
                  this.setState({ bussiness_entertainment: data });
                })
                .catch((error) => {
                  alert(error);
                });
            } else {
              this.setState({
                bussiness_entertainment: [],
                eatBU: this.state.enterBU
              });
            }

            await AsyncStorage.removeItem("Offers");
            Keyboard.dismiss();
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={this.state.car}
            onChange={() => this.setState({ car: !this.state.car })}
          />
          <Text style={{ marginTop: 7 }}>Do Not Have A Car ?</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={this.state.eat}
            onChange={() => this.setState({ eat: !this.state.eat })}
          />
          <Text style={{ marginTop: 7 }}>Would Not Like To Eat ?</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <CheckBox
            value={this.state.entertainment}
            onChange={() =>
              this.setState({ entertainment: !this.state.entertainment })
            }
          />
          <Text style={{ marginTop: 7 }}>
            Would Not Like To Entertainment ?
          </Text>
        </View>
        <FlatList
          data={this.state.bussiness_entertainment}
          renderItem={({ item }) => {
            if (this.state.currentLocation != null) {
              let transportationSalary = this.distance(
                item._id.latitude,
                item._id.longitude,
                this.state.currentLocation.latitude,
                this.state.currentLocation.longitude
              );
              if (transportationSalary <= this.state.tranBU) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Actions.ContainerItems(item);
                    }}
                  >
                    <View>
                      <Text>{item._id.title}</Text>
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: `http://192.168.1.129:9000/${item._id.busIMG}`
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Actions.ContainerItems(item);
                  }}
                >
                  <View>
                    <Text>{item._id.title}</Text>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{
                        uri: `http://192.168.1.105:9000/${item._id.busIMG}`
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item._id.id}
        />

        <FlatList
          data={this.state.bussiness_restaurants}
          renderItem={({ item }) => {
            if (this.state.currentLocation != null) {
              let transportationSalary = this.distance(
                item._id.latitude,
                item._id.longitude,
                this.state.currentLocation.latitude,
                this.state.currentLocation.longitude
              );
              if (transportationSalary <= this.state.tranBU) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Actions.ContainerItems(item);
                    }}
                  >
                    <View>
                      <Text>{item._id.title}</Text>
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: `http://192.168.1.129:9000/${item._id.busIMG}`
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Actions.ContainerItems(item);
                  }}
                >
                  <View>
                    <Text>{item._id.title}</Text>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{
                        uri: `http://192.168.1.129:9000/${item._id.busIMG}`
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item._id.id}
        />

        {/* ----------------------------------------------------------------- */}
        {/* <FlatList
          data={this.state.bussiness_restaurants}
          renderItem={({ item }) => {
            console.log(this.state);
          }}
          keyExtractor={(item) => item._id.id}
        /> */}

        <Button
          title="Your Trip Path"
          onPress={() => {
            Actions.yourTrip();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OutTrip;

{
  /* let transportationSalary = this.distance(
  item._id.latitude,
  item._id.longitude,
  this.state.currentLocation.latitude,
  this.state.currentLocation.longitude
); */
}

// console.log(this.state.currentLocation);
{
  /*
if (transportationSalary <= this.state.tranBU) {
  return (
    <TouchableOpacity
      onPress={() => {
        Actions.ContainerItems(item);
      }}
    >
      <View>
        <Text>{item._id.title}</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: `http://192.168.1.129:9000/${item._id.busIMG}`
          }}
        />
      </View>
    </TouchableOpacity>
  );
} */
}
