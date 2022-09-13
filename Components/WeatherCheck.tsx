import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import axios,{AxiosResponse} from "axios";
import { APIKEY, API_URLS } from '../constants';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

interface CapitalWeatherCurrent{
    current:{
        "observation_time": string,
        "temperature": number,
        "weather_code": number,
        "weather_icons": Array<string>,
        "weather_descriptions": Array<string>,
        "wind_speed": number,
        "wind_degree": number,
        "wind_dir": string,
        "pressure": number,
        "precip": number,
        "humidity": number,
        "cloudcover": number,
        "feelslike": number,
        "uv_index": number,
        "visibility": number,
        "is_day": string,
    }
}

const WeatherCheck = (props:NativeStackScreenProps<any, 'WeatherCheck'>) => {
    const [weather,setWeather]=useState(new Object as CapitalWeatherCurrent);
    const [loading,setLoading]=useState(false);
    const fetchWeather = async (capital:string)=>{
        try {
            setLoading(true)
            const response:AxiosResponse<CapitalWeatherCurrent> = await axios.get(`${API_URLS.weather_check}current`,{
                params:{
                    access_key:APIKEY,
                    query:capital
                }
            })
            if(response.data){
                setWeather(response.data)
            }
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(props.route.params && props.route.params.capital){
            fetchWeather(props.route.params.capital)
        }
    },[props.route.params])

    if(loading){
        return <View style={{...styles.viewstyle,flex:1,justifyContent:"center"}}>
            <ActivityIndicator size="large" />
        </View>
    }
  return (
      <View style={styles.viewstyle}>
        { weather?.current?.weather_icons?.length ? 
        <Image style={styles.imagestyle} source={{
            uri:weather?.current?.weather_icons[0]!
        }} /> : null}
        <Text style={styles.textstyle}>{weather?.current?.temperature!} &deg;C</Text>
        <Text style={styles.textstyle}>{weather?.current?.precip!} %</Text>
        <Text style={styles.textstyle}>{weather?.current?.wind_speed!} kmph</Text>
      </View>
  );
};

const styles=StyleSheet.create({
    viewstyle:{
        display:"flex",
        alignItems:"center",
        marginTop:8
    },
    textstyle:{
        color:"black",
        fontSize:16
    },
    imagestyle:{
        width:300,
        height:300
    }
})

export default WeatherCheck;
