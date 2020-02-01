import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import BuildItem from "./buildItem";
class BuildYTrip extends Component {
  state = { data: null };
  componentDidMount = () => {
    console.log(this.props.navigation.state.params);
    this.setState({ data: this.props.navigation.state.params.data });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../Public/tashashni_logo.png")}
          style={{ width: 156, height: 49, position: "absolute", top: 36 }}
        ></ImageBackground>
        <View style={{ marginTop: 125 }}>
          <ScrollView>
            <FlatList
              numColumns={3}
              data={this.state.data}
              renderItem={({ item }) => <BuildItem items={item} />}
              keyExtractor={(item) => item._id}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default BuildYTrip;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
