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
      <View>
        <TouchableOpacity
          onPress={async () => {
            if (!this.state.clicked) {
              if ((await AsyncStorage.getItem("Offers")) === null) {
                await AsyncStorage.setItem(
                  "Offers",
                  JSON.stringify([this.props.itemData])
                );
                {
                  /* console.log(await AsyncStorage.getItem("Offers")); */
                }
              } else {
                let locaStorage = JSON.parse(
                  await AsyncStorage.getItem("Offers")
                );
                locaStorage.push(this.props.itemData);
                await AsyncStorage.setItem(
                  "Offers",
                  JSON.stringify(locaStorage)
                );
              }
              this.setState({
                clicked: true,
                index:
                  JSON.parse(await AsyncStorage.getItem("Offers")).length - 1
              });
              console.log(
                this.state,
                JSON.parse(await AsyncStorage.getItem("Offers")).length,
                "Mohammad"
              );
            } else {
              let localStorage = JSON.parse(
                await AsyncStorage.getItem("Offers")
              );
              console.log("Before", localStorage);

              localStorage.splice(this.state.index, 1);
              console.log("After", localStorage);
              await AsyncStorage.setItem(
                "Offers",
                JSON.stringify(localStorage)
              );

              this.setState({ clicked: false, index: null });
            }
           
          }}
        >
          <View>
            <Text>{this.props.itemData.name}</Text>
            <Text>{this.props.itemData.price}</Text>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: `http://192.168.1.105:9000/${this.props.itemData.itemIMG}`
              }}
            />
          </View>
        </TouchableOpacity>
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

export default Items;
