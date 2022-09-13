import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { obtenerProductos } from "./api";
import { useState } from "react";
import React, { Component } from "react";

export function Productos() {
  const [data, setData] = useState([]);
  const recibirProductos = async () => {
    try {
      const response = await obtenerProductos();
      setData(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        style={{
          elevation: 2,
        }}
        title='Obtener Productos'
        onPress={recibirProductos}
      ></Button>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={styles.container}>
              <View style={styles.contenedor2}>
                <Text style={styles.titulos}>{item.name}</Text>
                <Text style={styles.price}>Precio: ${item.price},00</Text>
                <Image
                  style={styles.tinyLogo}
                  source={{ uri: item.image }}
                  onPress={() =>
                    Linking.openURL(
                      "https://payp.page.link/rZDe?data=eyJpZCI6NTkzODMsImN1cnJlbmN5joVVNEwXiOnRydWUsInFyVil6juMCJ9"
                    )
                  }
                />
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: "#01de68" }}
                  onPress={() =>
                    Linking.openURL(
                      "https://payp.page.link/rZDe?data=eyJpZCI6NTkzODMsImN1cnJlbmN5joVVNEwXiOnRydWUsInFyVil6juMCJ9"
                    )
                  }
                >
                  <Text style={{ ...styles.btnText, color: "#f1f1f1" }}>
                    Comprar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
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
    justifyContent: "center",
  },
  titulos: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    borderRadius: 10,
    width: 120,
    height: 40,
  },
  btnText: {
    textAlign: "center",
    borderRadius: 10,
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    elevation: 20,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "rgb(229, 255, 0)",
    borderRadius: 100,
    width: 120,
    textAlign: "center",
    marginBottom: 5,
  },
  imgBox: {
    width: 72,
    height: 72,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  btnComprar: {
    width: 72,
    height: 72,
    borderRadius: 100,
  },
  tinyLogo: {
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  contenedor2: {
    flex: 1,
    backgroundColor: "rgb(143, 229, 255)",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginBottom: 20,
    borderColor: "solid rgb(0, 0, 0)",
    marginTop: 10,
  },
  elevacion: { elevacion: 25, shadowColor: "rgb(0, 0, 0)", borderRadius: 100 },
});
