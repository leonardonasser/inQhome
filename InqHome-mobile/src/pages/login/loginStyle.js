import { StyleSheet,Dimensions} from "react-native"
import Constants from 'expo-constants';

export const loginstyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"white",
    },
    view: {
        paddingTop: Constants.statusBarHeight,
        width: Dimensions.get('window').width -20,
    },
    cardButton:{
        margin: 2,
        marginLeft: 0,
        marginRight:0,
    },
    logo: {
        width: "50%",
        height: 125,
        
    },
    center: {
        alignItems: 'center',
    },
})