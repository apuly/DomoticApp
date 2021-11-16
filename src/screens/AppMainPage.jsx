import React from 'react';
import { styles } from '../../styles/styles';
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { ModuleOverviewScreen } from './ModuleOverview';
import { HomeScreen } from './HomeScreen';
import { APIProvider } from '../context/APIContext';


const Drawer = createDrawerNavigator()

export const AppMainPage = ({}) => {
        return (
            <APIProvider>
                <NavigationContainer style = {styles.textdefault}>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Modules" component = {ModuleOverviewScreen}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </APIProvider>
        );
}