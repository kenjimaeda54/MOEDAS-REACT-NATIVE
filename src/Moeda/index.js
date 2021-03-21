import React, { Component } from "react";
import { TextInput, Text, TouchableOpacity, Keyboard, StyleSheet, View } from "react-native";

import api from "../../services/api";

//convert?q=USD_PHP&compact=ultra&apiKey=3110d41608cc9c47be9d
export default class Moeda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaBValor: 0,
      valorConvertido: 0,
    };
    this.converter = this.converter.bind(this);
  }

  // nossa api tem '_' por isso contactnou com underline
  //la no topo esta nossa API USD_PHP.
  //em let moeda ==  Nos fizemos uma requisição dinamica,sem precisar trocar
  //manualmente o link , entao se eu desejar EUA_BRL ou BRL-_EUA sera possivel
  //se possivel na API
  async converter() {
    let moeda = this.state.moedaA + "_" + this.state.moedaB;
    let response = await api.get(
      `convert?q=${moeda}&compact=ultra&apiKey=3110d41608cc9c47be9d`
    );
    let cotacao = response.data[moeda];
    let resultado = cotacao * parseFloat(this.state.moedaBValor);
    //em moedaBvalor e o valor digitado pelo usuario por isso converte
    //em parseFloat, ja que tuduo digitado no campo input e string.
    this.setState({
      valorConvertido: resultado.toFixed(2),
    });
    Keyboard.dismiss();
  }

  render() {
    let { moedaA, moedaB } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          {moedaA} para {moedaB}
        </Text>
        <TextInput
          autoFocus={true}
          style={styles.areaInput}
          onChangeText={(moedaBValor) => this.setState({ moedaBValor })} //aqui e this.setState({moedaBValor:moedaBValor})
          //quando e mesmo estado pode colcocar apenas um.
          keyboardType="numeric"
          placeholder="valor para converter"
        />
        <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
          <Text style={styles.botaoTexto}>CONVERTA</Text>
        </TouchableOpacity>
        <Text style={styles.valorConvertido}>
          {(this.state.valorConvertido === 0) ? " " : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  areaInput: {
    width: 280,
    height: 45,
    backgroundColor: "#CCC",
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
    color: "#000",
    borderRadius: 5,
  },
  botaoArea: {
    width: 150,
    height: 45,
    backgroundColor: "#FF0000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  botaoTexto: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFF",
  },
  valorConvertido: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },
});
