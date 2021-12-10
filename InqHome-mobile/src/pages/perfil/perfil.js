import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons, } from '@expo/vector-icons';
import { perfilStyles } from './perfilStyles';
import { Button } from "react-native-paper";

import { AppLoading } from 'expo';
import {
    useFonts,
    OpenSans_300Light,
    OpenSans_400Regular,
    // OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    // OpenSans_600SemiBold_Italic,
    // OpenSans_700Bold,
    // OpenSans_700Bold_Italic,
    // OpenSans_800ExtraBold,
    // OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from "react-native";


export default function Perfil() {

    
  const navigation = useNavigation();

  
    
    const [nome, setNome] = useState([]);
    const [email, setEmail] = useState([]);
    const [telefone, setTelefone] = useState([]);

  
    const fonts = useFonts({
        OpenSans_300Light,
        OpenSans_400Regular,
        OpenSans_600SemiBold,
    });

    if (!fonts) {
        return <AppLoading />
    }


    const getData = async () => {
        setNome(await AsyncStorage.getItem('nome') || 'none');
        setEmail(await AsyncStorage.getItem('email') || 'none');
        setTelefone(await AsyncStorage.getItem('telefone') || 'none');
    }

    const deslogar = () => {

        const setDeslogUsuario = async () => {
            try {
              await AsyncStorage.setItem('token', null);
              await AsyncStorage.setItem('idUsuario', null);
              await AsyncStorage.setItem('nome', null);
              await AsyncStorage.setItem('email', null);
              await AsyncStorage.setItem('telefone', null);
            } catch (error) {
               console.log(error.message);
            }
          };
          setDeslogUsuario();
          
          navigation.navigate('Login');
    }
    
      useEffect(() => {
        getData();
      }, [])

    return (
        <ScrollView style={perfilStyles.responsive}>
            <View style={perfilStyles.center}>
                <Image
                    source={require('../../assets/noimage.jpg')}
                    style={perfilStyles.avatar}
                />
            </View>
            <View style={perfilStyles.row}>
                <AntDesign name="user" size={22} style={perfilStyles.icon} />
                <Text style={styles.fnegrito}>Nome:</Text>
                <Text style={styles.fnormal}>{nome}</Text>
            </View>
            <View style={perfilStyles.row}>
            <MaterialIcons name="alternate-email" size={24} style={perfilStyles.icon} />
                <Text style={styles.fnegrito}>Email:</Text>
                <Text style={styles.fnormal}>{email}</Text>
            </View>
            <View style={perfilStyles.row}>
            <AntDesign name="phone" size={24} style={perfilStyles.icon} />
                <Text style={styles.fnegrito}>Telefone:</Text>
                <Text style={styles.fnormal}>{telefone}</Text>
            </View>
            
            <Button mode="contained" style={perfilStyles.buttonSair} size={10} 
            onPress={() => deslogar()}>Sair</Button>
            
        </ScrollView>

    );
    
}
const styles = StyleSheet.create({
    
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
})
;