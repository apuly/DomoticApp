import React, { useState } from 'react'
import { useContext } from 'react';
import { Button, View, Text } from 'react-native';
import {styles} from '../../styles/styles'
import {validators} from '../FieldValidators'
import { SettingsContext } from '../context/SettingsContext';
import {SettingsTextEntry} from '../components/input_fields'

export function Settings({navigation})
{
    return (
        <SettingsSheet Navigation={navigation}/>
    )
}

export const SettingsSheet = (props) => {
    const {apiHost, setAPIHost} = useContext(SettingsContext)

    const [host, setHost] = useState('http://192.168.188.62:3000/');
    const [error, setError] = useState("")


    return (
        <View>
            <SettingsTextEntry Name={"API Host"} SetText = {setHost} Text={host} />

            <View style={styles.buttonview}>
            <Text style={styles.texterror}>{error} </Text>
            <Button
            title = {"Save changes"}
            onPress = {() => {
                if (validators.URLValidator(host)) { //check if the given host is a URL
                    //check if host is valid domotic api
                    fetch(host)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data.info.title == "PostgREST API"){
                            setAPIHost(host)
                            props.Navigation.goBack()
                        } else {
                            setError("Host is not domotic API")
                        }
                    }).catch(e => {
                        if (e.message == "Network request failed"){
                            setError("Invalid host")
                        } else if (e.message.startsWith("JSON Parse error")){
                            setError("Host is not domotic API")
                        } else {
                            setError("Unkown error occured:"+e.message)
                        }
                                                
                    })
                }
            }}
            />
            </View>
        </View>
        
    );
}