import { StyleSheet,Dimensions} from "react-native"
import Constants from 'expo-constants';
import { theme } from '../../../AppStyle'

export const homeStyle = StyleSheet.create({
    filtro: {
        width: Dimensions.get('window').width,
        zIndex: 1,
        position: 'absolute',
        paddingTop: Constants.statusBarHeight,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top: Constants.statusBarHeight + 35
      },
      container: {
        width: Dimensions.get('window').width,
      },

      fabView: {
        margin: 16,
        right: 0,
        alignSelf: 'flex-end',
        top: Constants.statusBarHeight + 500,
        zIndex: 1,
        position: 'absolute',
      },

      fab: {
        backgroundColor: theme.colors.primary
      },
      

      //Modal anuncio

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: Dimensions.get('window').width - 70,
        display: 'flex'
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        top: 10
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginTop: 10,
        marginBottom: 15,
        textAlign: "center"
      },
      swiperContent: {
        flexDirection: 'row',
        height: 280,
        width: '100%',
      },
      cardButton:{
        margin: 2,
        marginLeft: 0,
        marginRight:0,
    },
    mTitulo: {
      fontFamily: "OpenSans_600SemiBold",
      fontSize: 22,
      color: 'black',
      paddingLeft: 4,
      marginBottom: 20,
    },

})