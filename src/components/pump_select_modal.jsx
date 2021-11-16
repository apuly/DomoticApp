import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatList, ForceTouchGestureHandler } from 'react-native-gesture-handler';
import { styles } from '../../styles/styles';
import { APIContext } from '../context/APIContext';
import { component_type } from '../DomoticData/components';

const moduleEntry = (data, setModalVisible, setPump) => {
    return (
    <TouchableOpacity 
    onPress= {() => {
        setPump(data.item)
        setModalVisible(false)
    }}>
        <View style={styles.listentry}>
            <Text style={styles.textdefault}>{(data.item.name != null ? data.item.name : data.item.uuid).toString()}</Text>
        </View>
    </TouchableOpacity>
    );
}

export const PumpSelectModal = (prompt) => {
    const {api_fetch} = useContext(APIContext)
    const [isLoading, setLoading] = useState(true)
    const [pump_entries, setPumpEntries] = useState({})
    useEffect(() => {
        api_fetch("component?component_type=eq." + component_type.WaterPump)
        .then(data => {
            let found = []
            data.forEach((device) => {
                console.log(device);
                let found_item = prompt.AllDevices.find(item => item.id == device.device_id)
                if (found_item !== undefined) {
                    found.push(found_item)
                }
            })
            found.push({
                name: "Detach pump",
                id: -1
            })
            setPumpEntries(found)
        })
        .finally(() => setLoading(false))
    }, [])
    return (
        <View>
            <Modal
            animationType="slide"
            transparent={false}
            visible={prompt.ModalVisible}
            onRequestClose={() => {prompt.SetModalVisible(false)}}
            >
                { isLoading ? 
                <ActivityIndicator />
                :
                <FlatList
                        data={pump_entries}
                        keyExtractor={({ id }, index) => pump_entries[index].id.toString()}
                        renderItem={(item) => moduleEntry(item, prompt.SetModalVisible, prompt.SetPump)}
                />
                }
            </Modal>
        </View>
    );
}