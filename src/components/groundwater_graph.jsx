import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useContext, useState, useEffect } from 'react';
import { APIContext } from '../context/APIContext';

const LineGraph = (prompt) => {
    return (
    <View style={{padding: "0%"}}>
    <LineChart
        data={prompt.Data}
        width={Dimensions.get("window").width} // from react-native
        height={420}
        //verticalLabelRotation={-30}
        formatXLabel={(s) => {
            let d = new Date(s)
            return d.toLocaleTimeString()}}
            yAxisInterval={1}
        chartConfig={{
            propsForVerticalLabels: {
                rotation: -30,
                originY: 380,
                onPress: () => console.log("yeet")
            },
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        }}
        //bezier
        style={{
        marginVertical: 8,
        borderRadius: 0
        }}
    />
    </View>
        );
}
export const GroundwaterGraph = (prompt) => {
    const {api_fetch} = useContext(APIContext)
    const [isLoading, setLoading] = useState(true)
    const [groundwaterData, setGroundwaterData] = useState(null)

    useEffect(() => {
        api_fetch("groundwater?module_id=eq."+prompt.Device.id)
        .then(entries => {
            let y_data = []
            let x_data = []
            let dataset;
            if (entries.length != 0){
                entries.forEach(element => {
                    y_data.push(element.value)
                    x_data.push(element.time)
                })
                dataset = { 
                    labels: x_data,
                    datasets: [{
                        data: y_data
                    }] 

                }
            } else {
                dataset = { 
                    labels: [1],
                    datasets: [{
                        data: [1]
                    }]
                }
            }
            setGroundwaterData(dataset)
        })
        .finally(() => {
            setLoading(false)        
        })
    }, [])

    return (
        <View>
            {isLoading ?
                <ActivityIndicator />
                :
                <LineGraph Data={groundwaterData} />
            } 
        </View>
       
    )

}
