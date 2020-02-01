import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground
} from "react-native";
class yourTrip extends Component {
  state = { data: [] };
  componentDidMount = async () => {
    this.setState({ data: JSON.parse(await AsyncStorage.getItem("Offers")) });
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
                        {item.description}
                      </Text>
                      <Text
                        style={{ alignSelf: "flex-end", fontWeight: "bold" }}
                      >
                        {item.price} J.D
                      </Text>
                    </View>
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

export default yourTrip;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
