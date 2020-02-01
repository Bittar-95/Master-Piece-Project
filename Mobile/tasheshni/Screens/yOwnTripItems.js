import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
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
      <View style={styles.container}>
        <ImageBackground
          source={require("../Public/tashashni_logo.png")}
          style={{ width: 156, height: 49, position: "absolute", top: 36 }}
        ></ImageBackground>
        <ScrollView style={{ marginTop: 125 }}>
          <View style={{ alignItems: "center" }}>
            <FlatList
              numColumns={3}
              data={this.state.data}
              renderItem={({ item }) => (
                <View
                  style={{
                    margin: 5,
                    backgroundColor: "#f5f5f5",
                    borderWidth: 3,
                    borderColor: "#d9d9d9"
                  }}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: `http://192.168.43.188:9000/${item.itemIMG}`
                    }}
                  />
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text style={{ fontWeight: "bold", color: "gray" }}>
                      {item.price} J.D
                    </Text>
                    <Text style={{ fontWeight: "bold", alignSelf: "flex-end" }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id + Math.random() * 1000}
            />
          </View>
        </ScrollView>
        <View>
          <Text
            style={{
              color: "#086cdd",
              fontSize: 20,
              fontWeight: "bold",
              paddingLeft: 30,
              paddingRight: 30
            }}
          >
            Expected Budget Is : {this.state.budget} J.D
          </Text>
        </View>
      </View>
    );
  }
}

export default YourOwnTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
