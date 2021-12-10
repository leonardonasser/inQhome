import { StyleSheet, Dimensions } from "react-native"
import Constants from 'expo-constants';
import { theme } from '../../../AppStyle'

export const anuncioStyle = StyleSheet.create({
    content: {
        padding: 15,
        paddingTop: 0,
    },
    responsive: {
        paddingTop: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
    },
    icon: {
        color: theme.colors.primary
    },
    distancia: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0,
    },
    container: {
        width: Dimensions.get('window').width,
        padding: 20,
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 15,
        marginLeft: 0,
        marginRight: 0,
        color: theme.colors.primary
    },
    textStyleCard: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 15,
        marginLeft: 10,
        marginRight: 0,
        color: theme.colors.primary
    },
    cardButton:{
        margin: 15,
        marginLeft: 2,
        marginRight:5,
        marginBottom:30,

    },
})