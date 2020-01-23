import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  AsyncStorage
} from "react-native";
class BuildItem extends Component {
  state = { clicked: false, index: null };

  render() {
    const { name, price, itemIMG } = this.props.items;
    return (
      <TouchableOpacity
        onPress={async () => {
          if (!this.state.clicked) {
            if ((await AsyncStorage.getItem("buildItems")) === null) {
              await AsyncStorage.setItem(
                "buildItems",
                JSON.stringify([this.props.items])
              );
              {
                /* console.log(await AsyncStorage.getItem("Offers")); */
              }
            } else {
              let locaStorage = JSON.parse(
                await AsyncStorage.getItem("buildItems")
              );
              locaStorage.push(this.props.items);
              await AsyncStorage.setItem(
                "buildItems",
                JSON.stringify(locaStorage)
              );
            }
            this.setState({
              clicked: true,
              index:
                JSON.parse(await AsyncStorage.getItem("buildItems")).length - 1
            });
          } else {
            let localStorage = JSON.parse(
              await AsyncStorage.getItem("buildItems")
            );

            localStorage.splice(this.state.index, 1);
            await AsyncStorage.setItem(
              "buildItems",
              JSON.stringify(localStorage)
            );

            this.setState({ clicked: false, index: null });
          }
        }}
      >
        <View>
          <Text>{name}</Text>
          <Text>{price}</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: `http://192.168.1.105:9000/${itemIMG}`
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default BuildItem;
