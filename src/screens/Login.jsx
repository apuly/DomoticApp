import React, {useContext} from 'react'
import { Button, View, Text } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { styles } from '../../styles/styles';
import { SettingsTextEntry} from '../components/input_fields'
import { AuthContext} from '../context/AuthContext'
import { SettingsContext } from '../context/SettingsContext';

export function Login({navigation})
{
    const {apiHost} = useContext(SettingsContext);
    if (apiHost == "") {
        return (
            <View style={styles.centered_page}>
                <Text>Configure API host before logging in</Text>
                <Button title="go to Settings" onPress={() => {
                    navigation.navigate("Settings")
                }}/>
            </View>
        )
    } else {
        return (
            <LoginScreen />
        )
    }
}

export const LoginScreen = (props) => {
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('password')
    const {set_token} = useContext(AuthContext)
    const {apiHost} = useContext(SettingsContext)
    return (
        <View>
            <SettingsTextEntry Name={"Username"} SetText = {setUsername} Text={username} />
            <SettingsTextEntry Name={"Password"} SetText = {setPassword} Text={password} />
            <View style={styles.buttonview}>
                <Button
                title="Login"
                onPress= {() => {
                    /*BE AWARE:
                    THE LOGIN FUNCTION IS DUMMY AT THIS POINT
                    IT SIMPLY REQUESTS A JWT TOKEN THAT WILL BE GENERATED NO MATTER WHAT YOU PUT IN FOR USERNAME AND PASSWORD
                    THIS FUNCTIONALITY STILL NEEDS TO BE IMPLEMENTED ON THE API SIDE
                    SO DON'T ACTUALLY TRUST THIS YOU IDIOT
                    */
                    let login_page = apiHost+'rpc/jwt_test'
                    fetch(apiHost+'rpc/jwt_test')
                    .then(resp => resp.json())
                    .then(data => {
                        set_token(data[0].token)
                    })
                    .catch(e => console.log(e))
                }}
                />
            </View>
        </View>
    );
}