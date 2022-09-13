import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Productos } from "./pages/Productos";
import { Inicio } from "./pages/Inicio";

const Menu = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen name="Inicio" component={Inicio}/>
        <Menu.Screen name="Productos" component={Productos} />
      </Menu.Navigator>
    </NavigationContainer>
  );
}