import { StyleSheet, Dimensions } from "react-native"
import Constants from 'expo-constants';
import { theme } from '../../../AppStyle'

export const perfilStyles = StyleSheet.create({

    responsive: {
        paddingTop: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1

    },
    buttonClose: {
        padding: 15,
        elevation: 2,
        top: 10
    },

    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    swiperContent: {
        flexDirection: 'row',
        height: 340,
        width: '100%',
    },
    headerContent: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },

    row: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    center: {
        alignItems: 'center',
    },
    house: {
        paddingLeft: 4,
        fontSize: 18,
        color: '#4f4a4a'
    },
    rating: {
        fontSize: 9,
        color: '#4f4a4a'
    },

    description: {
        paddingHorizontal: 20,
        color: 'black',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 20,
        fontFamily: "OpenSans_300Light",
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        height: 90,
        height: 90,
        borderRadius: 8,
        marginRight: 20,
    },

    fnegrito: {
        fontFamily: "OpenSans_600SemiBold",
        fontSize: 17,
        color: 'black',
        paddingLeft: 4,
        
    },

    fnormal: {
        fontFamily: "OpenSans_300Light",
        fontSize: 17,
        color: 'black',
        paddingLeft: 4,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 80,
    },
    icon: {
        color: theme.colors.primary
    },
    buttonSair: {
        alignSelf: 'center',
        borderRadius:20,
       marginTop:'10%',
        
        
    },

})