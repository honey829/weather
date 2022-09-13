import { StyleProp, TextStyle, ViewStyle } from "react-native";

export const HomeViewStyles:StyleProp<ViewStyle>={
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}

export const HomeTextStyle:StyleProp<TextStyle>={
    borderColor:"black",
    borderWidth:1,
    width:250,
    height:50,
    marginBottom:40,
    color:"black"
}

export const HomeButtonStyle:StyleProp<ViewStyle>={
    marginTop:4,
    width:200,
    height:50,
}

export const HomeLabel:StyleProp<TextStyle>={
    position:"relative",
    left:-80,
    top:8,
    zIndex:100,
    backgroundColor:"#f1f1f1",
    backfaceVisibility:"hidden",
    color:"black"
}