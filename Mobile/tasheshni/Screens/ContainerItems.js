import React, { Component } from "react";
import Item from "./Item";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  AsyncStorage
} from "react-native";
class Items extends Component {
  state = { items: [], clicked: false };
  componentDidMount = () => {
    this.setState({
      items: this.props.navigation.state.params.businesses
    });
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <View>
              <Item itemData={item} />
              {/* <Text>Hello</Text> */}
            </View>
          )}
          keyExtractor={(item) => item._id}
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

export default Items;
