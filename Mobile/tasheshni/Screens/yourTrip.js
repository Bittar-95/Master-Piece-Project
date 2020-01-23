import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  Image
} from "react-native";
class yourTrip extends Component {
  state = { data: [] };
  componentDidMount = async () => {
    this.setState({ data: JSON.parse(await AsyncStorage.getItem("Offers")) });
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: `http://192.168.1.105:9000/${item.itemIMG}`
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
}

export default yourTrip;
