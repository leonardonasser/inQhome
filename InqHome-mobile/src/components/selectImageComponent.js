import React, { useState, useEffect } from 'react';
import {Button, TextInput } from 'react-native-paper';
import { View, SafeAreaView,  Image, ScrollView, StyleSheet,Dimensions, FlatList} from 'react-native';
import { anuncioStyle } from '../pages/anuncio/anuncioStyle';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';

export default function SelectImageComponent({ navigation }) {
  
  const [photoss, setPhotoss] = useState([]);
  
  
  //const navigation = useNavigation();

  useEffect(() => { 
    const { params } = navigation.route;
    if (params) {
      const { photos } = params;
      if (photos) setPhotoss({ photos });
      delete params.photos;
    }
  }, [])

 

  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={i}
      />
    )
  }

  
 
    return (
      <SafeAreaView style={anuncioStyle.responsive}>
        <ScrollView>
        <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      
    </View>
          <View style={anuncioStyle.content}>
            <Button mode="contained" style={anuncioStyle.button} 
            onPress={() => { navigation.navigate('ImageScreen')
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
        </ScrollView>
      </SafeAreaView>
    );
  
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});