import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import NewUser from '../../components/NewUser'
import { mensageriaStyle } from './mensageriaStyle';
import { TextInput, Button, Card } from "react-native-paper";
import api from '../service/api';
import { AsyncStorage } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Mensageria() {

  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const getData = async () => {

    api.get(`contato/${await AsyncStorage.getItem('idUsuario') || 'none'}`, {
      headers: {
        authorization: await AsyncStorage.getItem('token') || 'none'
      }
    }).then((response) => {
      setData(response.data)
      //console.log('Contatos carrega com sucesso!' + response.data)
    });
  }


  useEffect(() => {
    getData();
    setInterval(
      function async() {
        getData();
      },
      5000
    );
  }, [])

  const irTelaChat = (contato) => {
    navigation.navigate("MensageriaChat", { contato: contato });
  }

  return (

    <SafeAreaView style={mensageriaStyle.responsive}>
      <ScrollView>
        
            { data.map((el, index) => (
              
                 <NewUser
                    key={index} 
                    nome={el.usuarioResponsavel.nome}
                    dataHora={el.dataHora}
                    onPress={() => irTelaChat(el)}
                 />
         
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}
