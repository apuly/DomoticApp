import { useState } from "react";
import React from 'react'

export const SettingsContext = React.createContext({
    apiHost: "",
    setAPIHost: () => {}
});

export const SettingsProvider = ({children}) => {
    const [apiHost, setHost] = useState('');
        return (
        <SettingsContext.Provider
            value = {{
                apiHost,
                setAPIHost: setHost
        }}>{children}</SettingsContext.Provider>
    )
}