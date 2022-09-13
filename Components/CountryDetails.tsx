import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {API_URLS} from '../constants';
import axios, {AxiosResponse} from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Country {
  name: {
    common: string;
  };
  capital: Array<string>;
  latlng: Array<number>;
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}

const CountryDetails = (
  props: NativeStackScreenProps<any, 'CountryDetails'>,
) => {
  const [countryData, setCountryData] = useState(new Array<Country>());

  const [loading,setLoading]=useState(false);

  const fetchCountries = async (country: string) => {
    try {
        setLoading(true)
      const response: AxiosResponse<Array<Country>> = await axios.get(
        `${API_URLS.country_details}${country}`,
      );
      if (response.data) {
        setCountryData(response.data);
      }
    } catch (error) {
      console.error(error);
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    if (props.route.params && props.route.params.country) {
      fetchCountries(props.route.params.country);
    }
  }, [props.route.params]);
  
  const weatherCheck = (capital:string)=>{
    props.navigation.navigate("WeatherCheck",{capital})
  }
  const Item=(country:Country)=>{
      return <View style={styles.container}>
        <Image style={styles.imagestyle} source={{
            uri:country.flags.png
        }} />
        <Text style={styles.textstyle}>Capital : {country.capital.join()}</Text>
        <Text style={styles.textstyle}>Country Population : {country.population}</Text>
        <Text style={styles.textstyle}>Latitude : {country.latlng[0]}</Text>
        <Text style={styles.textstyle}>Longitude : {country.latlng[1]}</Text>
        <Button title='Capital Weather' onPress={()=>weatherCheck(country.capital[0])} />
      </View>
  }

  if(loading){
    return <View style={{...styles.container,flex:1}}>
        <ActivityIndicator size="large" />
    </View>
}
  return (
    <SafeAreaView style={styles.safeareaview}>
      <FlatList renderItem={(info=>{
        return <Item key={info.index} {...info.item} />
      })} data={countryData} />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeareaview:{
        marginTop:24
    },
  imagestyle:{
    width:300,
    height:300
  },
  container:{
    display:"flex",
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:50
  },
  textstyle:{
    color:"black",
    fontSize:16
  }
});

export default CountryDetails;
