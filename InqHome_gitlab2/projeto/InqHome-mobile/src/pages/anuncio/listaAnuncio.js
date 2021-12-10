import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View,ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import New from '../../components/NewAnuncio'
import { anuncioStyle } from './anuncioStyle';

export default function telaAnuncio() {

    return (
        <SafeAreaView style={anuncioStyle.responsive}>
            <ScrollView>
                <New
                    cover={require('../../assets/house1.jpg')}
                    name="Casa 01"
                    prince="100,00"
                    description="Casa com um quarto disponivel"
                    onPress={() => {}}
                />

<New
                    cover={require('../../assets/house2.jpg')}
                    name="Casa 02"
                    prince="200,00"
                    description="Casa com um quarto disponivel"
                    onPress={() => {}}
                />

<New
                    cover={require('../../assets/house3.jpg')}
                    name="Casa 03"
                    prince="300,00"
                    description="Casa com um quarto disponivel"
                    onPress={() => {}}
                />

            </ScrollView>
        </SafeAreaView>
    );
}
