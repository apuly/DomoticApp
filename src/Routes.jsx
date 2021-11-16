import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { styles } from "../styles/styles"
import { useContext } from 'react'
import { Settings } from './screens/Settings'
import { Login} from './screens/Login'
import { AuthContext } from './context/AuthContext'
import { AppMainPage } from './screens/AppMainPage'

const Stack = createStackNavigator()

export const Routes = () => {
    const { jwt_token } = useContext(AuthContext)
    if (jwt_token == "") {
        return (
            <NavigationContainer style = {styles.textdefault}>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component = {Login}/>
                    <Stack.Screen name="Settings" component = {Settings}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <AppMainPage />
        )
    };
}