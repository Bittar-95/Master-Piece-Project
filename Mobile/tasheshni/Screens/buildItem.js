import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
class BuildItem extends Component {
  state = { clicked: false, index: null };

  render() {
    const { name, price, itemIMG, description } = this.props.items;
    return (
      <TouchableOpacity
        onPress={async () => {
          if (!this.state.clicked) {
            if ((await AsyncStorage.getItem("buildItems")) === null) {
              await AsyncStorage.setItem(
                "buildItems",
                JSON.stringify([this.props.items])
              );
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
        <View
          style={{
            margin: 5,
            borderWidth: 3,
            borderColor: "#d9d9d9",
            backgroundColor: "#f5f5f5"
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `http://192.168.43.188:9000/${itemIMG}`
            }}
          />
          <View style={{ padding: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <Text style={{ fontWeight: "bold", color: "gray" }}>
              {description}
            </Text>
          </View>

          <Text style={{ fontWeight: "bold", alignSelf: "flex-end" }}>
            {price} J.D
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default BuildItem;
