import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import config from "./src/aws-exports";
import AuthContextProvider from "./src/context/AuthContext";
import BasketContextProvider from "./src/context/BasketContext";
import OrderContextProvider from "./src/context/OrderContext";

Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <RootNavigator />
          </OrderContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
