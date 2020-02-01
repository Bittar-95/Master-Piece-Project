import React from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { Router, Scene, Actions, Stack } from "react-native-router-flux";
import Home from "./Screens/Home";
import OurTrip from "./Screens/OurTrip";
import ContainerItems from "./Screens/ContainerItems";
import BuildYouTrip from "./Screens/BuildYourTrip";
import yourTrip from "./Screens/yourTrip";
import BuildYItem from "./Screens/BuildYTripItems";
import YOwnTrip from "./Screens/yOwnTripItems";
export default function App() {
  return (
    <>
      <Router>
        <Stack>
          <Scene key="home" component={Home} title="Home"></Scene>
          <Scene key="OurTrip" component={OurTrip} title="Our Trip"></Scene>
          <Scene
            key="BuildYouTrip"
            component={BuildYouTrip}
            title="Build You Trip"
          ></Scene>
          <Scene
            key="ContainerItems"
            component={ContainerItems}
            title="Offers"
          ></Scene>
          <Scene key="yourTrip" component={yourTrip} title="Your Trip"></Scene>
          <Scene
            key="yourOwnTrip"
            component={YOwnTrip}
            title="Your Own Trip"
          ></Scene>
          <Scene
            key="BuildYItem"
            component={BuildYItem}
            title="Build Your Trip"
          ></Scene>
        </Stack>
      </Router>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
/*
          style={{ width: 156, height: 49, position: "absolute", top: 36 }}

*/
