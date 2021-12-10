import { Button, Card, TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { anuncioStyle } from './anuncioStyle';
import { Formik} from 'formik';
import api from '../service/api';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AsyncStorage } from "react-native";

export default function Anuncio(props) {

  const [isTipoImovel, setTipoImovel] = useState(false);
  const [isTemGaragem, setTemGaragem] = useState(false);
  const [isTemPet, setTemPet] = useState(false);

  const navigation = useNavigation();

  const [latDef, setLatDef] = useState();
  const [lngDef, setLngDef] = useState();

  const photoss = props.route.params.photosir;


  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={i}
      />
    )
  }


  const pegarLatELng = (numero, endereco, cidade, estado) => {

    console.log("rua" + endereco)
    console.log("numero" + numero)
    console.log("cidade" + cidade)
    console.log("estado" + estado)

    const getDataLatELng = async () => {
      const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=/
      ${endereco + " " + numero + " " + cidade + " " + estado}/&key=AIzaSyC5W7_73I48OdD2m-SLOxRMvV1zqhl333c`)

      console.log("Lat" + result.data.results[0].geometry.location.lat);
      console.log("Lng" + result.data.results[0].geometry.location.lng);

      setLatDef(result.data.results[0].geometry.location.lat);
      setLngDef(result.data.results[0].geometry.location.lng);
    }
    getDataLatELng();

  }


  useEffect(() => {
  }, [])

  return (
    <ScrollView style={anuncioStyle.container}>
      <Formik
        initialValues={{
          usuarioResponsavelId: '',
          titulo: '',
          tipoImovel: '',
          cep: '',
          endereco: '',
          lat: '',
          lng: '',
          cidade: '',
          estado: '',
          numero: '',
          numeroVagas: '',
          descricao: '',
          temGaragem: '',
          permitidoPets: '',
          valorAluguel: '',
        }}

        onSubmit={(values) => {

          values.temGaragem = isTemGaragem;
          values.permitidoPets = isTemGaragem;
          values.lat = latDef;
          values.lng = lngDef;
          console.log(values)

          if (isTipoImovel) {
            values.tipoImovel = 'APARTAMENTO';
          } else {
            values.tipoImovel = 'CASA';
          }

          const submitAnuncio = async () => {
            values.usuarioResponsavelId = await AsyncStorage.getItem('idUsuario') || 'none';

            api.post("anuncio", values, {
              headers: {
                authorization: await AsyncStorage.getItem('token') || 'none'
              }
            }).then((response) => {
              navigation.navigate('Entrar');
              console.log('Anúncio Salvo com sucesso!' + response.data)
            });
          }
          submitAnuncio();
        }}
      >


        {(props) => ( 
          

          <View>

          { getDataEndereco = async (cep) => {
              const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
              console.log("Endereco: " + result.data.logradouro);
             
              props.values.endereco = result.data.logradouro;
              props.values.cidade = result.data.localidade;
              props.values.estado = result.data.uf;
            }}

            <TextInput label="Título do Anúncio"
              onChangeText={props.handleChange('titulo')}
              value={props.values.titulo} />

            <Card style={anuncioStyle.container} style={anuncioStyle.distancia}>
              <Text style={anuncioStyle.textStyleCard} >Tipo do imóvel?</Text>
              <CheckBox
                center
                title='Apartamento'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={isTipoImovel}
                onPress={() => setTipoImovel(true)}
              />

              <CheckBox
                center
                title='Casa'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={() => setTipoImovel(false)}
                checked={!isTipoImovel}
              />
            </Card>

            <TextInput style={anuncioStyle.distancia} label="CEP"
              onChangeText={props.handleChange('cep')}
              onBlur={() => getDataEndereco(props.values.cep)}
              value={props.values.cep} />

            <TextInput style={anuncioStyle.distancia} label="Endereço"
              onChangeText={props.handleChange('endereco')}
              onBlur={() => pegarLatELng(props.values.numero, props.values.endereco, props.values.cidade, props.values.estado)}
              value={props.values.endereco} />

            <TextInput style={anuncioStyle.distancia} label="Número" keyboardType="phone-pad"
              onChangeText={props.handleChange('numero')}
              onBlur={() => pegarLatELng(props.values.numero, props.values.endereco,  props.values.cidade, props.values.estado)}
              value={props.values.numero}
            />

            <TextInput style={anuncioStyle.distancia} label="Número de vagas" keyboardType="phone-pad"
              onChangeText={props.handleChange('numeroVagas')}
              value={props.values.numeroVagas}
            />

            <TextInput style={anuncioStyle.distancia} label="Descrição"
              onChangeText={props.handleChange('descricao')}
              value={props.values.descricao} />

            <Card style={anuncioStyle.container} style={anuncioStyle.distancia} >
              <Text style={anuncioStyle.textStyleCard} >Tem Garagem?</Text>
              <CheckBox
                style={anuncioStyle.selectStyle}
                center
                title='Sim'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={isTemGaragem}
                onPress={() => setTemGaragem(true)}
              />

              <CheckBox
                center
                title='Não'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={() => setTemGaragem(false)}
                checked={!isTemGaragem}
              />
            </Card>

            <Card style={anuncioStyle.container} >
              <Text style={anuncioStyle.textStyleCard}>São permitido Pets?</Text>
              <CheckBox
                center
                title='Sim'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={isTemPet}
                onPress={() => setTemPet(true)}
              />

              <CheckBox
                center
                title='Não'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={() => setTemPet(false)}
                checked={!isTemPet}
              />
            </Card>

            <TextInput style={anuncioStyle.distancia} label="Valor do aluguel" keyboardType="phone-pad"
              onChangeText={props.handleChange('valorAluguel')}
              value={props.values.valorAluguel}
            />

            <View style={anuncioStyle.content}>
              <Button mode="contained" style={anuncioStyle.button}
                onPress={() => {
                  navigation.navigate('ImageScreen')
                }}>Selecione as Imagens</Button>
              <ScrollView>
                {
                  photoss.map((item, i) => (
                    <Image
                      style={{ height: 100, width: 100 }}
                      source={{ uri: item.uri }}
                      key={i}
                    />
                  ))}



              </ScrollView>
            </View>

            <Button mode="contained" style={anuncioStyle.cardButton} onPress={props.handleSubmit}>Registrar anúncio</Button>

          </View>
        )}


      </Formik>

    </ScrollView>
  );
}
