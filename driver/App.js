import { StatusBar } from "expo-status-bar";
import orders from "./assets/data/orders.json";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";


export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
