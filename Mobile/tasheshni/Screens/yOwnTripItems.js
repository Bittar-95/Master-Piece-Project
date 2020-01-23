import React, { Component } from "react";
import { View, Text, AsyncStorage, FlatList, Image } from "react-native";
class YourOwnTrip extends Component {
  state = { data: [], budget: 0 };
  componentDidMount = async () => {
    this.setState({
      data: JSON.parse(await AsyncStorage.getItem("buildItems"))
    });

    JSON.parse(await AsyncStorage.getItem("buildItems")).map((item) => {
      this.setState({ budget: this.state.budget + item.price });
    });
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
          keyExtractor={(item) => item._id + Math.random() * 1000}
        />
        <View>
          <Text>Expected Budget Is : {this.state.budget} J.D</Text>
        </View>
      </View>
    );
  }
}

export default YourOwnTrip;
