import { useState, useContext } from "react";
import React from 'react'
import { SettingsContext } from "./SettingsContext";

export const AuthContext = React.createContext({
    jwt_token: "",
    set_token: () => {},
    api_fetch: () => {},
    jwt_header: () => {}
});

export const AuthProvider = ({children}) => {
    const [jwt_token, setJWTtoken] = useState('');
    const {apiHost} = useContext(SettingsContext)
        return (
        <AuthContext.Provider
            value = {{
                jwt_token,
                set_token: setJWTtoken,
                jwt_header: () => {
                    return {
                        "Authorization": "Bearer "+jwt_token
                    }
                },
                api_fetch: (url) => {
                    return fetch(apiHost + url, {
                        headers: {
                            "Authorization": "Bearer "+jwt_token
                        }
                    })
                }
        }}>{children}</AuthContext.Provider>
    )
}