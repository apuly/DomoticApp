import React, { Fragment } from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { styles } from '../../styles/styles';
import { ChangeNameModal } from './change_name_modal';


export const DeviceName = (prompt) => {
    const [modalVisable, setModalVisible] = useState(false)
        return (
            <Fragment>
            <ChangeNameModal Device={prompt.Device} ModalVisible={modalVisable} SetModalVisible={setModalVisible} />    
            <View style={styles.listentry}>
                <TouchableOpacity
                onPress= {() => {
                    setModalVisible(true)
                }}>
                    <Text style={styles.textdefault}>
                    {
                        prompt.Device.name === null ? "No name set" : prompt.Device.name
                    }
                    </Text>
                </TouchableOpacity>
            </View>
            </Fragment>
        );
}