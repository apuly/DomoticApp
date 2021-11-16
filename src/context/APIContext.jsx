import { useState, useContext } from "react";
import React from 'react'
import { SettingsContext } from "./SettingsContext";
import { AuthContext } from "./AuthContext";
//import FormData from 'FormData';

export const APIContext = React.createContext({
    api_fetch: () => {},
    device_by_uuid: () => {},
    device_by_id: () => {},
    api_patch: () => {},
});

export const APIProvider = ({children}) => {
    const {apiHost} = useContext(SettingsContext)
    const {jwt_token} = useContext(AuthContext)

    const fetcher = (url) => {
        return fetch(apiHost + url, {
            headers: {
                "Authorization": "Bearer "+jwt_token
            }
        })
        .then(resp => resp.json())
        .catch(e => console.log(e))
    }

    const patcher = (url, data) => {        
        return fetch(apiHost+url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer "+jwt_token,
                'Content-Type': 'application/json'
            }
        })
    }

        return (
        <APIContext.Provider
            value = {{
                api_fetch: fetcher,
                api_patch: patcher,

                device_by_uuid: (uuid) => {
                    return fetcher("device?uuid=eq."+uuid)
                    .then(devices => {return devices[0]})
                },
                device_by_id: (id) => {
                    return fetcher("device?id=eq."+id)
                    .then(devices => {return devices[0]})
                },
        }}>{children}</APIContext.Provider>
    )
}