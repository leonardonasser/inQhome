import 'react-native-gesture-handler';
import React, { useState, useEffect }  from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import NewDespesa from '../../components/NewDespesa'
import { despesaStyle } from './despesaStyle';
import { TextInput, Button, Card } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native";
import api from '../service/api';
import { useNavigation } from '@react-navigation/native';

export default function Despesa() {
   
   
  const navigation = useNavigation();

    const initialState = {
        usuario1: '',
      };
    
    const [state, setState] = useState(initialState);

    const [idLogado, setIdLogado] = useState([]);
    const [idDonoCasa, setIdDonoCasa] = useState([]);
    const [despesas, setDespesas] = useState([]);

    const liberacaoDespesa = async () => {
        setIdLogado(await AsyncStorage.getItem('idUsuario') || 'none');
        state.usuario1 = await AsyncStorage.getItem('idUsuario') || 'none';
        api.post("inquilino/liberar", state, {
            headers: {
                authorization: await AsyncStorage.getItem('token') || 'none'
            }
        }).then((response) => {
            getDespesas(response.data.casa.idCasa);
            setIdDonoCasa(response.data.casa.usuarioResponsavel.idUsuario);
            setInterval(
                function async() {
                  getDespesas(response.data.casa.idCasa);
                },
                5000
              );
            console.log('Criar despesa liberada com sucesso!');
        });
    }

    const criarDespesa = () => {
          navigation.navigate('AddDespesa');
    }

    const getDespesas = async (idCasad) => {

        api.get(`despesas/casa/${idCasad}`, {
          headers: {
            authorization: await AsyncStorage.getItem('token') || 'none'
          }
        }).then((response) => {
            setDespesas(response.data);
        });
      }

      useEffect(() => {
        liberacaoDespesa();
      }, [])


     const getDescricao = (data) => {

      var data = new Date(data),
      dia  = data.getDate().toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'), 
      ano  = data.getFullYear();

        return "Vence em " + dia + "/" + mes + "/" + ano;
      }

    return (
        <SafeAreaView style={despesaStyle.responsive}>

     
            <ScrollView>
                
                
                {idDonoCasa == idLogado && (
                <Button style={despesaStyle.cardButton} mode="contained" onPress={() => criarDespesa()}>
                    <Text>Adicionar Despesas  </Text>
                    <Ionicons name="add-circle" size={21} color="white" />
                </Button>
                )} 

            {
            
            despesas.map((el, index) => (
              
              

                <NewDespesa
                    cover={require('../../assets/conta1.jpeg')}
                    name={el.titulo}
                    prince={el.valor}
                    inquilino="INQ#45745"
                    status="pago"
                    description={getDescricao(el.dataValidade)}
                    onPress={() => { }}
                />

                
            ))}

         { /*      <NewDespesa
                    cover={require('../../assets/conta2.jpeg')}
                    name="Conta de água"
                    prince="50,00"
                    inquilino="INQ#45745"
                    status="pago"
                    description="Conta de água referente ao mês 11/2021 "
                    onPress={() => { }}
         />*/}

            </ScrollView>
        </SafeAreaView>
    );
}
