import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Moeda from "./src/Moeda";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Moeda moedaA="USD" moedaB="BRL" />
        <Moeda moedaA="BRL" moedaB="USD" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
