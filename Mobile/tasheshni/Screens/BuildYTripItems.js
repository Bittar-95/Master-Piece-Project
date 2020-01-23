import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import BuildItem from "./buildItem";
class BuildYTrip extends Component {
  state = { data: null };
  componentDidMount = () => {
    console.log(this.props.navigation.state.params);
    this.setState({ data: this.props.navigation.state.params.data });
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <BuildItem items={item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
}

export default BuildYTrip;
