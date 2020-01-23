import React from "react";
import { StyleSheet, View, Button, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Get Trip"
        onPress={() => {
          Actions.OurTrip();
        }}
      />
      <Button
        title="Build Your Trip"
        onPress={async () => {
          await AsyncStorage.removeItem("buildItems");
          Actions.BuildYouTrip();
        }}
      />
    </View>
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
