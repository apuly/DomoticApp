import React, { Fragment } from 'react'
import { useState, useContext } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import { SettingsNumericEntry, SettingsTextEntry } from '../components/input_fields';
import { PumpSelectModal } from '../components/pump_select_modal'
import { APIContext } from '../context/APIContext';


export const PumpConfigScreen = ({navigation, route}) => {
    const {api_patch} = useContext(APIContext)
    const [getPump, setPump] = useState(null)
    const [getSensorTargetValue, setSensorTargetValue] = useState(0)
    const [getPumpTime, setPumpTime] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [loadOldValues, setLoadOldValues] = useState(true)
    let device = route.params.device
    //console.log(device)

    if (route.params.pump_data !== null && loadOldValues) {
        setPumpTime(route.params.pump_data.pump_time)
        setSensorTargetValue(route.params.pump_data.target_groundwater_value)

        let pump_device = route.params.all_devices.find(i => i.id == route.params.pump_data.device_id)
        if (pump_device.length !== 0){
            setPump(pump_device)
        }
        setLoadOldValues(false)
    }

    return (
        <View>  
            <Text style={styles.textdefault}>Setup for module "{device.name !== null ? device.name : device.uuid}"</Text>
            <View style={styles.textview}>
                {   showModal   && 
                    <PumpSelectModal ModalVisible={showModal} SetModalVisible={setShowModal} AllDevices={route.params.all_devices} SetPump={setPump}/>
                } 
                <Text style={styles.textdefault}>Sensor:  </Text>
                <TouchableOpacity style={styles.touchableButton}
                onPress={()=> setShowModal(true)}
                >
                    <View style={{width: "100%"}}>
                    <Text style={styles.textdefault}>
                    {
                        getPump === null ? "select pump" : getPump.name !== null ? getPump.name : getPump.uuid
                    }
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <SettingsNumericEntry Name={"Pump time in seconds"} SetVal = {setPumpTime} Val={getPumpTime} Min={0} />
            <SettingsNumericEntry Name={"Target sensor reading"} SetVal = {setSensorTargetValue} Val={getSensorTargetValue} Min={0} />
            <View style={styles.buttonview}>
            <Button
            title="Save changers"
            onPress={() => {
                let new_pump_data = {
                    groundwatersensor_id: device.id,
                    target_groundwater_value: getSensorTargetValue,
                    pump_time: getPumpTime
                }
                let old_pump_data = {
                    groundwatersensor_id: null,
                    target_groundwater_value: 0,
                    pump_time: 0
                }
                api_patch("water_pump?groundwatersensor_id=eq."+device.id, old_pump_data)
                .then(resp => resp.text())
                .catch(e => (console.log(e)))
                
                if (getPump.id != -1){ //pumpid is -1 when detaching the pump from a sensor
                    api_patch("water_pump?device_id=eq."+getPump.id, new_pump_data)
                    .then(resp => resp.text())
                    .catch(e => (console.log(e)))
                }     
                
                navigation.goBack()
            }}
            />
            </View>
        </View>
    );
}
