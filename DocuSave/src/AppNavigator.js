import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AddDocumentScreen from "./screens/AddDocumentScreen";
import Navbar from "./components/Navbar";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{
          //   headerTitle: () => <Navbar />, // Render Navbar as header title
          // }}
        />
        <Stack.Screen
          name="DocumentUpload"
          component={AddDocumentScreen}
          options={{ headerShown: true, title: "View Documents" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
