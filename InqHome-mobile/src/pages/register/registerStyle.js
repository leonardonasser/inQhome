import { StyleSheet,Dimensions} from "react-native"
import Constants from 'expo-constants';
import { theme } from '../../../AppStyle'

export const registerStyle = StyleSheet.create({
    content: {
        padding: 15,
        paddingTop:0,
    },
    responsive: {
        paddingTop: Constants.statusBarHeight,
        width: Dimensions.get('window').width,
    },
    icon:{
        color: theme.colors.primary
    },
    button:{
        margin: 15,
        marginLeft: 0,
        marginRight:0,
    },


})