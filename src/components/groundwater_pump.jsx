import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import React, { Fragment, useEffect, useState } from 'react'
import { useContext } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import { APIContext } from '../context/APIContext';

export const GroundwaterPump = (prompt) => {
    const {api_fetch} = useContext(APIContext)
    const [isLoading, setLoading] = useState(true)
    const [pumpData, setPumpData] = useState(null)
    const isFocused = useIsFocused()
 
    useEffect(() => {
        if (!isFocused) {
            return
        }

        api_fetch("water_pump?groundwatersensor_id=eq."+prompt.Device.id)
        .then(data => {
            if (data.length === 1){
                setPumpData(data[0])
            } else {
                setPumpData(null)
            }
        })
        .finally(() => setLoading(false))
    }, [isFocused])

    let pump_device
    if (pumpData !== null)
        pump_device = prompt.AllDevices.find(i => i.id == pumpData.device_id)

    return (
        <View>
            {
                isLoading ?
                <ActivityIndicator />
                :
                <TouchableOpacity
                onPress={() => prompt.Navigation.navigate("Setup pump", {
                    device: prompt.Device,
                    all_devices: prompt.AllDevices,
                    pump_data: pumpData
                })}
                >
                    <View style={styles.listentry}>
                        {
                        pumpData === null ? 
                            <Text style={styles.textdefault}>No pump connected.</Text>
                        :
                            <Fragment>
                                <Text style={styles.textdefault}> Attached pump: {pump_device.name !== null ? pump_device.name : pump_device.uuid}</Text>
                                <Text style={styles.textdefault}> Pump time: {pumpData.pump_time}</Text>
                                <Text style={styles.textdefault}> Target value: {pumpData.target_groundwater_value} </Text>
                            </Fragment>
                        }
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}