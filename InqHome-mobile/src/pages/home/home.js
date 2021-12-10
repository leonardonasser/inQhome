import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Pressable, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { homeStyle } from './homeStyle';
import { useNavigation } from '@react-navigation/native';
import { FAB, Button } from 'react-native-paper';
import api from '../service/api';
import SwiperComponent from '../../components/Swiper';
import { AsyncStorage } from "react-native";


export default function Home() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [anuncios, setAnuncios] = useState([]);
  const [modalAnuncio, setModalAnuncio] = useState(false);
  const [anuncioM, setAnuncioM] = useState();

  const navigation = useNavigation();

  const irToAnuncio = () => {
    navigation.navigate("Anuncio", { photosir: [] });
  }
  const irTelaAnuncio = () => {
    console.log('opa')
    setModalAnuncio(false);
    navigation.navigate("TelaAnuncio", { anuncio: anuncioM });
  }



  const [origin, setOrigin] = useState(null);

  const abrirModal = (anuncio) => {

    setModalAnuncio(true);
    setAnuncioM(anuncio);

    setOrigin({
      latitude: parseFloat(anuncio.casa.lat),
      longitude: parseFloat(anuncio.casa.lng),
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    })

  }

  const getAnuncios = async () => {
    const result = await api.get('anuncio', {
      headers: {
        authorization: await AsyncStorage.getItem('token') || 'none'
      }
    })

    console.log("Anuncio: " + result.data);
    setAnuncios(result.data);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      })


      getAnuncios();
      setInterval(
        function async() {
          getAnuncios();
        },
        5000
      );
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  return (
    <View>


      <View style={homeStyle.filtro}>

        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {

            setOrigin({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0143,
              longitudeDelta: 0.0134,
            })
            getAnuncios();
          }}
          query={{
            key: 'AIzaSyCqtH6mpePIrYeZmzyDdGktYIuiLtT4mfE',
            language: 'pt-br',
          }}
        />


      </View>

      <MapView
        style={homeStyle.map}
        region={origin}
        showsUserLocation={true}
        loadingEnabled={true}
      >

        {
          anuncios.map((anuncio, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(anuncio.casa.lat),
                longitude: parseFloat(anuncio.casa.lng),
              }}
              title={anuncio.titulo}
              description={"R$:" + anuncio.casa.valorAluguel.toString()}

              onPress={() => abrirModal(anuncio)}
            >
              <View>
                <Image
                  source={require('../../../assets/icons/home.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#055292'
                  }} />
              </View>

            </Marker>
          ))
        }

      </MapView>

      <View style={homeStyle.fabView}>

        <FAB
          small
          icon="plus"
          style={homeStyle.fab}
          onPress={irToAnuncio}
        />

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAnuncio}
      >
        <View style={homeStyle.centeredView}>
          <Pressable
            style={[homeStyle.button, homeStyle.buttonClose]}
            onPress={() => setModalAnuncio(!modalAnuncio)}
          >
            <Text style={homeStyle.textStyle}>Fechar</Text>
          </Pressable>
          <View style={homeStyle.modalView}>
            <Text style={homeStyle.modalText, homeStyle.mTitulo}>{anuncioM?.titulo}</Text>
            <View style={homeStyle.swiperContent}>
              <SwiperComponent />
            </View>
            <Text style={homeStyle.modalText}>{anuncioM?.descricao}</Text>
            <Button style={homeStyle.cardButton} onPress={irTelaAnuncio}>Mais Informações</Button>
          </View>
        </View>

      </Modal>



    </View>

  );
}
