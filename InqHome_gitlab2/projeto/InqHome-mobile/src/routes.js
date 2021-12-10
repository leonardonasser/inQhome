import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './pages/home/home';
import { Text, View, Image, StyleSheet } from 'react-native';
import mensageria from './pages/mensageria/mensageria';
import { Ionicons, Feather, FontAwesome, } from '@expo/vector-icons';
import { theme } from '../AppStyle'
import Despesa from './pages/despesas/despesas';
import { AsyncStorage } from "react-native";
import api from './pages/service/api';
import Perfil from './pages/perfil/perfil';



const Tab = createBottomTabNavigator();

export default function Routes() {

    const initialState = {
        usuario1: '',
      };
    
    const [state, setState] = useState(initialState);

    const [idLogado, setIdLogado] = useState([]);
    const [despesaLiberado, setDespesaLiberado] = useState([]);


    const liberacaoDespesa = async () => {
        setIdLogado(await AsyncStorage.getItem('idUsuario') || 'none');
        state.usuario1 = await AsyncStorage.getItem('idUsuario') || 'none';
        api.post("inquilino/liberar", state, {
            headers: {
                authorization: await AsyncStorage.getItem('token') || 'none'
            }
        }).then((response) => {
            setDespesaLiberado(response.data.despesasLiberado);
            console.log('Despesa liberada com sucesso!');
        });
    }

    useEffect(() => {
        setDespesaLiberado(false);
        liberacaoDespesa();
    }, [])

    return (

        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle:
                {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: 'black',
                    borderTopWidth: 0.3,
                    shadowRadius: 100,
                    height: "9%",


                }
            }}
        >

            <Tab.Screen name="Home" component={Home}

                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                                <FontAwesome name="home" size={22} style={{
                                    color: focused ? '#055292' : '#748c94'
                                }} />
                                <Text
                                    style={{ color: focused ? '#055292' : '#748c94', fontSize: 12 }}>
                                    Home
                                </Text>
                            </View>
                        )
                    }
                }

            />


            {
                despesaLiberado ? <Tab.Screen name="despesa" component={Despesa}

                    options={
                        {
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                                    <Ionicons name="newspaper-outline" size={22} style={{
                                        color: focused ? '#055292' : '#748c94'
                                    }} />
                                    <Text
                                        style={{ color: focused ? '#055292' : '#748c94', fontSize: 12 }}>
                                        Despesas
                                    </Text>
                                </View>
                            )
                        }
                    }

                /> : null
            }



            <Tab.Screen name="Mensageria" component={mensageria}

                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                                <Ionicons name="notifications" size={22} style={{
                                    color: focused ? '#055292' : '#748c94'
                                }} />

                                <Text
                                    style={{ color: focused ? '#055292' : '#748c94', fontSize: 12 }}>
                                    Mensageria
                                </Text>
                            </View>
                        )
                    }
                }

            />




            <Tab.Screen name="Perfil" component={Perfil}

                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                                <Feather name="user" size={22} style={{
                                    color: focused ? '#055292' : '#748c94'
                                }} />

                                <Text
                                    style={{ color: focused ? '#055292' : '#748c94', fontSize: 12 }}>
                                    Perfil
                                </Text>
                            </View>
                        )
                    }
                }

            />

        </Tab.Navigator>
    )

}


export const styles = StyleSheet.create({

})