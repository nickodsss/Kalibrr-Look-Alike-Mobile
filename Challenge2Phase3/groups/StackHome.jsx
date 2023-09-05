import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import Detail from "../components/Detail";

const Stack = createNativeStackNavigator()


const StackHome = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackHome