import { StyleSheet, Dimensions } from "react-native"
import Constants from 'expo-constants';
import { theme } from '../../../AppStyle'

export const despesaStyle = StyleSheet.create({

    vbotao:{
        margin: 15,
        marginLeft: 0,
        marginRight:0,
        alignSelf: 'center',
        
    },
    responsive: {
        paddingTop: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex:1

    },

})