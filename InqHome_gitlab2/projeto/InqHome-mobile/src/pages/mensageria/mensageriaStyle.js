import { StyleSheet, Dimensions } from "react-native"
import Constants from 'expo-constants';

export const mensageriaStyle = StyleSheet.create({
  
    responsive: {
        paddingTop: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 55,
        flex:1

    },


})