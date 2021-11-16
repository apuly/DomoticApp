import { Button, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React from 'react'
import {styles} from '../../styles/styles'
import NumericInput from 'react-native-numeric-input';



export const SettingsTextEntry = prompt => {
    return (
        <View style = {styles.textview}>
            <Text style = {styles.textdefault}>{prompt.Name}</Text>
            <View style = {styles.textInputView}>
                <TextInput style={styles.textinput}
                    onChangeText = {text => prompt.SetText(text)}
                    value = {prompt.Text}
                />
            </View>
        </View>
    )
}

export const SettingsNumericEntry = prompt => {
    return (
        <View style = {styles.textview}>
            <Text style = {styles.textdefault}>{prompt.Name}</Text>
            <View style = {styles.textInputView}>
                <NumericInput style={styles.textinput}
                    minValue = {prompt.Min !== null ? prompt.Min : null}
                    maxValue = {prompt.Max !== null ? prompt.Max : null}
                    step={1}
                    onChange = {val => prompt.SetVal(val)}
                    value = {prompt.Val}
                    valueType='integer'
                    totalWidth={200}
                    totalHeight={60}
                />
            </View>
        </View>
    )
}
