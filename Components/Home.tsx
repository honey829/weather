import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { HomeLabel, HomeTextStyle, HomeViewStyles } from "../Styles/Home";
import {NativeStackScreenProps} from "@react-navigation/native-stack"

const Home=(props:NativeStackScreenProps<any,"Home">)=>{
    const [country,setCountry]=useState("");
    const handleSubmit=()=>{
        props.navigation.navigate("CountryDetails",{country});
    }
    return(<>
        <View style={HomeViewStyles}>
            {country.length ? <Text style={HomeLabel}>Enter Country</Text> : null}
            <TextInput value={country} placeholderTextColor="black" style={HomeTextStyle} accessibilityLabel="Enter Country" placeholder="Enter Country" onChangeText={(text=>setCountry(text))}/>
            <Button title="Submit" color="purple" disabled={!country.length} onPress={handleSubmit} />
        </View>
        </>)
}

export default Home;