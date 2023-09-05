import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import StackHome from "./groups/StackHome";
import AboutPage from "./screens/AboutPage";

import { ApolloProvider } from "@apollo/client";
import client from "./config";

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Main') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'About') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Main" component={StackHome} options={{
            headerShown: false,
          }}></Tab.Screen>
          <Tab.Screen name="About" component={AboutPage}></Tab.Screen>
        </Tab.Navigator>


      </NavigationContainer>
    </ApolloProvider>
  );
}

