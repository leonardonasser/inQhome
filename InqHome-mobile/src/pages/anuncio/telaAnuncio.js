import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Fontisto, FontAwesome5, EvilIcons, AntDesign } from '@expo/vector-icons';
import SwiperComponent from '../../components/Swiper';
import { anuncioStyle } from './anuncioStyle';
import { Button, TextInput } from "react-native-paper";
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
import { homeStyle } from '../home/homeStyle';
import { Formik } from 'formik';
import { AsyncStorage } from "react-native";
import api from '../service/api';

export default function TelaAnuncio({ route }) {

  const [anuncio, setAnuncio] = useState();

  const [modalProposta, setModalProposta] = useState(false);

  const fonts = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  if (!fonts) {
    return <AppLoading />
  }

  useEffect(() => {
    setAnuncio(route.params?.anuncio)
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiperContent}>
          <SwiperComponent />
        </View>

        <View style={styles.headerContent}>
          <View style={{ width: '85%' }}>
            <Text style={styles.ftitulo}>{anuncio?.titulo}</Text>
          </View>

          <View style={{ width: '15%' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <EvilIcons name="check" size={36} color="#00f289" />
            </View>
            <Text style={styles.rating}>Virificado</Text>
          </View>

        </View>

        <Text style={styles.fpreco}>
          R$  {anuncio?.casa.valorAluguel}
        </Text>

        <View style={styles.row}>
          <Fontisto name="home" size={22} style={anuncioStyle.icon} />
          {anuncio?.tipoImovel == 'CASA' ? <Text style={styles.fnegrito}>Casa</Text> : <Text style={styles.fnegrito}>Apartamento</Text>}
        </View>

        <View style={styles.row}>
          <MaterialIcons name="pets" size={22} style={anuncioStyle.icon} />
          <Text style={styles.fnegrito}>Pet:</Text>
          {anuncio?.permitidoPets == true ? <Text style={styles.fnormal}>Sim</Text> : <Text style={styles.fnormal}>Não</Text>}
        </View>

        {
          //   <View style={styles.row}>
          //  <FontAwesome name="bed" size={22} style={anuncioStyle.icon} />
          //  <Text style={styles.fnegrito}>Quarto:</Text>
          //  <Text style={styles.fnormal}>1</Text>
          // </View>
        }

        <View style={styles.row}>
          <MaterialCommunityIcons name="garage-variant" size={22} style={anuncioStyle.icon} />
          <Text style={styles.fnegrito}>Garagem:</Text>
          <Text style={styles.fnormal}>{anuncio?.vagasDisponiveis}</Text>
        </View>

        <View style={styles.row}>
          <FontAwesome5 name="users" size={22} style={anuncioStyle.icon} />
          <Text style={styles.fnegrito}>Vagas Disponíveis:</Text>
          <Text style={styles.fnormal}>{anuncio?.vagasDisponiveis}</Text>
        </View>

        <Text style={styles.description}>
          {anuncio?.descricao}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 15, marginTop: 35 }}>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/house5.jpg')}
              style={{ width: 90, height: 90, borderRadius: 8 }}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../../assets/house6.jpg')}
              style={{ width: 90, height: 90, borderRadius: 8 }}
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../../assets/house2.jpg')}
              style={{ width: 90, height: 90, borderRadius: 8 }}
            />
          </View>
        </ScrollView>

        <Button mode="contained" style={anuncioStyle.cardButton}
          onPress={() => setModalProposta(true)}>Enviar Proposta</Button>


        {//MODAL ENVIAR PROPOSTA
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalProposta}
        >
          <View>
            <Formik
              initialValues={{
                descricao: '',
                usuarioEnvia: '',
                usuarioRecebe: '',
                msgProposta: true
              }}

              onSubmit={(values) => {
                console.log("foi proposta")

                const submitProposta = async () => {
                  console.log(await AsyncStorage.getItem('idUsuario') || 'none')
                  values.usuarioEnvia = await AsyncStorage.getItem('idUsuario') || 'none';
                  values.usuarioRecebe = anuncio.casa.usuarioResponsavel.idUsuario;

                  if (values.descricao != '' &&  values.usuarioEnvia != values.usuarioRecebe) {
                  api.post("mensagem", values, {
                    headers: {
                      authorization: await AsyncStorage.getItem('token') || 'none'
                    }
                  }).then((response) => {
                    setModalProposta(false);
                    console.log('Proposta enviada com sucesso!' + response.data)
                  });
                }
                }
                submitProposta();
              }}
            >

              {(props) => (
                <View style={styles.centeredView}>

                  <View style={styles.buttonClose}>
                    <AntDesign name="closecircle" onPress={() => setModalProposta(!modalProposta)} size={28} color="red" />
                  </View>

                  <View style={styles.modalView}>
                    <TextInput label="Digite a mensagem:"
                      onChangeText={props.handleChange('descricao')}
                      value={props.values.descricao}
                      style={{ width: '100%' }}
                      multiline
                    />

                    <Button mode="contained" style={anuncioStyle.cardButton} onPress={props.handleSubmit}>Enviar</Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>

        </Modal>

      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
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

  ftitulo: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 22,
    color: 'black',
    paddingLeft: 4,
  },

  fpreco: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300
  },
  modalView: {
    margin: 30,
    paddingTop:'20%',
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
    height: Dimensions.get('window').height - 400,
  }


});