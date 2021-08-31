import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config/index.json';
import { Custom, Filtro } from './style';


export default function Home() {

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    (async function () {
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        })

      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, [])

  return (
    <View>


<Filtro>

<GooglePlacesAutocomplete
  placeholder='Search'
  onPress={(data, details = null) => {
   console.log(data, details);
   
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      longitudeDelta: 0.000922,
      latitudeDelta: 0.000421
    });
  }}
  query={{
    key: 'AIzaSyDoqzfdMbaLYUfQX2ZJjuoNqVPEkB0Xd5Y',
    language: 'pt-br',
  }}
  enablePoweredByContainer={false}
  fetchDetails={true}
  styles={{ listView: { height: 10} }}
/>
</Filtro>

      <MapView

        style={styles.map}

        region={origin}

        showsUserLocation={true}
        loadingEnabled={true}
      >

        <Marker
          coordinate={{
            latitude: -23.44172527,
            longitude: -51.86645508,
          }}
          title="casa 01"
          description="R$:250,00"
        />

        <Marker
          coordinate={{
            latitude: -23.44125279,
            longitude: -51.86748505,
          }}
          title="casa 02"
          description="R$:300,00"
        />

        <Marker
          coordinate={{
            latitude: -23.43093654,
            longitude: -51.86267853,
          }}
          title="casa 02"
          description="R$:300,00"
        />

      </MapView>
    </View>

  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, 
    top: "10%"
  },
  container:{
    padding:10,
    height: "100%",
  }
});