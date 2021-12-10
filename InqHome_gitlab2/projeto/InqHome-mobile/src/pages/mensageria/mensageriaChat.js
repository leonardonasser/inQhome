import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, Keyboard, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewChatEsq from '../../components/NewChatEsq'
import NewChatDir from '../../components/NewChatDir'
import { mensageriaStyle } from './mensageriaStyle';
import { TextInput, Button, Card } from "react-native-paper";
import api from '../service/api';
import { AsyncStorage } from "react-native";
import { Formik } from 'formik';
import { anuncioStyle } from '../anuncio/anuncioStyle';
import { Feather } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../home/homeStyle';
import { Ionicons } from '@expo/vector-icons'; 

export default function MensageriaChat({ route }) {


  const navigation = useNavigation();

  const initialState = {
    descricao: '',
  };

  const [state, setState] = useState(initialState);

  const handleChange = (value, target) => {
    setState((state) => ({ ...state, [target]: value }));
  };

  const [mensagens, setMensagens] = useState([]);
  const [idLogado, setIdLogado] = useState([]);
  const [idSolicitanteInq, setIdSolicitanteInq] = useState([]);
  // Para saber se o contrato entre eles já estão ativos
  const [jaInquilino, setJaInquilino] = useState([]);

  const [modalAcInquilino, setModalAcInquilino] = useState(false);


  const getData = async () => {
    setIdLogado(await AsyncStorage.getItem('idUsuario') || 'none');
    api.get(`mensagem/${route.params?.contato.usuarioResponsavel.idUsuario}/${route.params?.contato.usuarioRecebe.idUsuario}`, {
      headers: {
        authorization: await AsyncStorage.getItem('token') || 'none'
      }
    }).then((response) => {
      setMensagens(response.data)
      //00console.log('Mensagens carrega com sucesso!' )
    });
  }


  const identificarInquilino = async () => {
    api.get(`inquilino/verificar/${route.params?.contato.usuarioResponsavel.idUsuario}/${route.params?.contato.usuarioRecebe.idUsuario}`, {
      headers: {
        authorization: await AsyncStorage.getItem('token') || 'none'
      }
    }).then((response) => {
      setIdSolicitanteInq(response.data.solicitanteInq.idUsuario);
      setJaInquilino(response.data.jaInquilino);
      console.log('Inquilino verificado com sucesso!');
    });
  }

  const aceitarInquilino = async () => {
    api.get(`inquilino/aceitar/${idLogado}/${idSolicitanteInq}`, {
        headers: {
            authorization: await AsyncStorage.getItem('token') || 'none'
        }
    }).then((response) => {
      setModalAcInquilino(false);
      setJaInquilino(true);
      console.log('Inquilino aceitado com sucesso!');
    });
}

  useEffect(() => {
    getData();
    var intervalo = setInterval(
      function async() {
        getData();
      },
      5000
    );
    identificarInquilino();
  }, [])

  const abrirModal = () => {
    setModalAcInquilino(true);
  }


  const back = () => {
    //clearInterval( intervalo );
    navigation.navigate('Entrar');
  }

  return (

    <SafeAreaView style={mensageriaStyle.responsive}>

      <Appbar >
        <Appbar.BackAction onPress={back} />
        <Appbar.Content title={route.params?.contato.usuarioResponsavel.nome} />


        {

          idSolicitanteInq != idLogado && (
            jaInquilino ?
              <Appbar.Action icon="account-multiple-check" onPress={() => console.log('Pressed label')} />
              :
              <Appbar.Action icon="account-multiple-remove-outline" onPress={() => abrirModal()} />
          )
        }

      </Appbar>

      <ScrollView bounces={true}>



        {mensagens.map((el, index) => (

          <View>
            {
              el.contato.usuarioResponsavel.idUsuario == idLogado

                ?
                <NewChatDir
                  key={index}
                  texto={el.texto}
                  dataHora={el.dataHora}
                />
                :
                <NewChatEsq
                  key={index}
                  texto={el.texto}
                  dataHora={el.dataHora}
                />

            }
          </View>
        ))}



      </ScrollView>

      <Formik
        initialValues={{
          descricao: '',
          usuarioEnvia: '',
          usuarioRecebe: '',
          msgProposta: false
        }}

        onSubmit={(values) => {
          console.log("foi mensagem " + state.descricao)
          values.descricao = state.descricao;
          state.descricao = '';

          const submitMensagem = async () => {
            console.log(await AsyncStorage.getItem('idUsuario') || 'none')
            values.usuarioEnvia = await AsyncStorage.getItem('idUsuario') || 'none';
            values.usuarioRecebe = route.params?.contato.usuarioResponsavel.idUsuario;

            if (values.descricao != '' && values.usuarioEnvia != values.usuarioRecebe) {
              api.post("mensagem", values, {
                headers: {
                  authorization: await AsyncStorage.getItem('token') || 'none'
                }
              }).then((response) => {
                Keyboard.dismiss();
                values.descricao = '';
                console.log('Mensagem enviada com sucesso!' + response.data)
              });
            }
          }
          submitMensagem();
        }}
      >



        {(props) => (

          <View style={[styles.container]}>
            <TextInput label="Mensagem:"

              value={state.descricao}
              onChangeText={(text) => handleChange(text, "descricao")}

              style={styles.msg}
              multiline
            />

            <Button style={anuncioStyle.cardButton} onPress={props.handleSubmit}><Feather name="send" size={34} style={{
              color: '#055292'

            }} /></Button>

          </View>
        )}
      </Formik>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAcInquilino}
      >
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalAcInquilino(!modalAcInquilino)}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </Pressable>
          <View style={homeStyle.modalView}>
            <Text>Deseja que essa pessoa seja seu inquilino ?</Text>
            <View style={[styles.container]}>
              <Button style={anuncioStyle.cardButton}
                onPress={() => setModalAcInquilino(!modalAcInquilino)}><Ionicons name="close" size={34} color="black" /></Button>

              <Button style={anuncioStyle.cardButton}
                onPress={() => aceitarInquilino()}><Ionicons name="checkmark" size={34} color="black" /></Button>
            </View>
          </View>

        </View>
      </Modal>


    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    alignSelf: "center",
    marginLeft: '2%'
  },
  cardButton: {

    marginLeft: 0,
    marginRight: 0,
    alignSelf: "flex-end",
  },
  msg: {
    width: Dimensions.get('window').width - 100,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});