import React, { Component } from "react";
import Item from "./Item";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  Button,
  AsyncStorage,
  ScrollView
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
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../Public/tashashni_logo.png")}
            style={{ width: 156, height: 49, position: "absolute", top: 36 }}
          ></ImageBackground>
        </View>
        <View style={{ marginTop: 125 }}>
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <FlatList
                numColumns={3}
                data={this.state.items}
                renderItem={({ item }) => (
                  <View
                    style={{
                      margin: 5,
                      borderWidth: 3,
                      borderColor: "#d9d9d9",
                      backgroundColor: "#f5f5f5"
                    }}
                  >
                    <Item itemData={item} />
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />
            </View>
          </ScrollView>
        </View>
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
