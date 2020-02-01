import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
class Items extends Component {
  state = { clicked: false, index: null };

  render() {
    return (
      <TouchableOpacity
        onPress={async () => {
          if (!this.state.clicked) {
            if ((await AsyncStorage.getItem("Offers")) === null) {
              await AsyncStorage.setItem(
                "Offers",
                JSON.stringify([this.props.itemData])
              );
            } else {
              let locaStorage = JSON.parse(
                await AsyncStorage.getItem("Offers")
              );
              locaStorage.push(this.props.itemData);
              await AsyncStorage.setItem("Offers", JSON.stringify(locaStorage));
            }
            this.setState({
              clicked: true,
              index: JSON.parse(await AsyncStorage.getItem("Offers")).length - 1
            });
            console.log(
              this.state,
              JSON.parse(await AsyncStorage.getItem("Offers")).length,
              "Mohammad"
            );
          } else {
            let localStorage = JSON.parse(await AsyncStorage.getItem("Offers"));
            console.log("Before", localStorage);

            localStorage.splice(this.state.index, 1);
            console.log("After", localStorage);
            await AsyncStorage.setItem("Offers", JSON.stringify(localStorage));

            this.setState({ clicked: false, index: null });
          }
        }}
      >
        <View>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `http://192.168.43.188:9000/${this.props.itemData.itemIMG}`
            }}
          />

          <View style={{ padding: 5 }}>
            <Text style={{ fontWeight: "bold" }}>
              {this.props.itemData.name}
            </Text>
            <Text style={{ fontWeight: "bold", color: "gray" }}>
              {this.props.itemData.description}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", alignSelf: "flex-end" }}>
              {this.props.itemData.price} J.D
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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

export default Items;
