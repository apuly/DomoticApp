import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import {View, Text, SafeAreaView, ActivityIndicator, Modal, Button, Alert} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import { APIContext } from '../context/APIContext';
import { createStackNavigator } from "@react-navigation/stack"
import { ModuleScreen } from "./Module"
import { PumpConfigScreen } from './PumpConfig';



const Stack = createStackNavigator()

const empty = () => {
    return <View>
        <Text>this is empty</Text>
    </View>
}

const moduleEntry = (data, entries, navigation) => {
    return (
    <TouchableOpacity 
    onPress= {() => {
        navigation.navigate("Module", {this_device: data.item, devices: entries})
    }}>
        <View style={styles.listentry}>
            <Text style={styles.textdefault}>{(data.item.name != null ? data.item.name : data.item.uuid).toString()}</Text>
        </View>
    </TouchableOpacity>
    );
}

const moduleOverviewScreen = ({navigation}) => {
    const {api_fetch} = useContext(APIContext)
    const [entries, setEntries] = useState([])
    const [isLoading, setLoading] = useState(true)
    //const [modalItem, setModalItem] = useState(null)
    
    useEffect(() => {
        api_fetch("device")
        .then(data => {module
            setEntries(data)
        })
        .then(() => setLoading(false))
        .catch(e => console.log(e))
    }, [])

    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator /> : 
                <View style={{paddingTop: "10%"}}>
                    {/* {modalItem == null ? <Fragment /> : <SensorModal Item={modalItem} SetItem={setModalItem}/>} */}
                    <FlatList
                        data={entries}
                        keyExtractor={({ id }, index) => entries[index].id.toString()}
                        renderItem={(item) => moduleEntry(item, entries, navigation)}
                    />
                </View>
            }
        </SafeAreaView>
    )
}


export const ModuleOverviewScreen  = () => {

    return (
        <Stack.Navigator initialRouteName="Overview">
            <Stack.Screen name="Overview" component={moduleOverviewScreen} />
            <Stack.Screen name="Setup pump" component = {PumpConfigScreen}/>
            <Stack.Screen name="Module" component = {ModuleScreen} />
        </Stack.Navigator>
    )
} 
