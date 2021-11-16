import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import {View, Text, ActivityIndicator, Modal} from 'react-native'
import { styles } from '../../styles/styles';
import { APIContext } from '../context/APIContext';
import { component_type} from '../DomoticData/components'
import { GroundwaterGraph } from '../components/groundwater_graph';
import { GroundwaterPump } from '../components/groundwater_pump';
import { DeviceName } from '../components/device_name';


export const ModuleScreen = ({route, navigation}) => {
    const {api_fetch} = useContext(APIContext)
    const [isLoading, setLoading] = useState(true)
    const [prevItem, setPrevItem] = useState(null)
    const [availableComponents, setAvailableComponents] = useState([])

    
    const device = route.params.this_device

    if (device != prevItem && device != null)
    {
        setPrevItem(device)
        setLoading(true)
    }

    useEffect(() => {
        //let component_list = []
        let components = [];
        api_fetch("component?device_id=eq."+device.id)
        .then(components_object => {
            console.log(components_object)
            components_object.forEach((element) => {components.push(element.component_type)})
            setAvailableComponents(components)
            setLoading(false)
        })}, [prevItem, navigation]);

    return (

        <View style={{ marginTop: 22 }}>
        
        {isLoading ? 
            <ActivityIndicator />
            :
            <View>
                <Text style={styles.textdefault}>Sensor uuid: {device.uuid}</Text>
                <DeviceName Device={device} />
                {availableComponents.includes(component_type.GroundwaterSensor) ?
                    <Fragment>
                        <GroundwaterGraph Device={device} />
                        <GroundwaterPump Device={device} Navigation={navigation} AllDevices={route.params.devices} />
                    </Fragment>
                    : <Fragment />
                }

            </View>
        }   
        </View>
    );
}
