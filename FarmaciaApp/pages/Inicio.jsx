import {
  Text,
  StyleSheet,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export function Inicio() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          textAlign: "left",
          width: "100%",
          padding: 5,
          elevation: 2,
          fontWeight: "bold",
          borderRadius: 10,
          backgroundColor: "#0ECCEA",
          textAlignVertical: "center",
          textAlign: "center",
          margin: 2,
        }}
      >
        {" "}
        Bienvenidos a la App de Farmacia Vitality
      </Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://res.cloudinary.com/dvjnqwzpc/image/upload/v1658463855/farmacia%20products/SQUARE_LOGO_ahma4i.png",
        }}
      />
      <Text
        style={{
          color: "white",
          elevation: 2,
          fontSize: 20,
          textAlign: "left",
          width: "auto",
          padding: 3,
          fontWeight: "bold",
          marginLeft: 20,
          borderRadius: 10,
          backgroundColor: "#34FF52",
        }}
      >
        Contacto:
      </Text>
      <View style={styles.Enlaces}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://t.me/FarmaciasVitalitybot")}
        >
          <Image
            style={styles.logosEnlaces}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/480px-Telegram_logo.svg.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://wa.me/message/R3YKYCZ6VJQGB1")
          }
        >
          <Image
            style={styles.logosEnlaces}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderRadius: 100 }}
          onPress={() =>
            Linking.openURL("https://maps.app.goo.gl/Ybw61eZbEUKZzzXu6")
          }
        >
          <Image
            style={styles.logosEnlaces}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5FFFF8",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tinyLogo: {
    width: 400,
    height: 400,
    elevation: 20,
  },
  logosEnlaces: {
    width: 75,
    height: 75,
    margin: 10,
  },
  Enlaces: {
    padding: 5,
    flexDirection: "row",
    width: "100%",
    height: 100,
    alignContent: "center",
    justifyContent: "center",
  },
});
