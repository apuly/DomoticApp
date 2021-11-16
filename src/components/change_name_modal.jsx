import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-native';
import { APIContext } from '../context/APIContext';
import { SettingsTextEntry } from './input_fields';


export const ChangeNameModal = (prompt) => {
    const {api_patch} = useContext(APIContext)
    const [getText, setText] = useState(prompt.Device.name === null ? "" : prompt.Device.name)
    return (
        <Modal
        visible={prompt.ModalVisible}
        onRequestClose={() => {prompt.SetModalVisible(false)}}
        >
            <SettingsTextEntry Name={"Module name"} SetText = {setText} Text={getText} />
            <Button
            title="Save changes"
            onPress={() => {
                  
                if (prompt.Device.name !== getText && getText != ""){ //pumpid is -1 when detaching the pump from a sensor
                    let new_device_data = {
                        name: getText
                    }  
                    api_patch("device?id=eq."+prompt.Device.id, new_device_data)
                    .then(resp => resp.text())
                    .catch(e => (console.log(e)))
                }     
                prompt.SetModalVisible(false);
            }}
            />
        </Modal>
    );
}