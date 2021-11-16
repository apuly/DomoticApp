import React from 'react'
import { AuthProvider } from './context/AuthContext';
import { Routes } from './Routes';
import { SettingsProvider } from './context/SettingsContext';

export const Providers = ({}) => {
    return (
        <SettingsProvider>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </SettingsProvider>
    );
}