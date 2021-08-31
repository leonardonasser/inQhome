import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './pages/home';
import Anuncio from './pages/anuncio';
import { Text, View, Image } from 'react-native';


const Tab = createBottomTabNavigator();

export default function Routes() {

    return(
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle : 
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
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}> 
                            <Image 
                            source={require('../assets/icons/home.png')} 
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#055292' : '#747c94'
                            }}
                            />
                            <Text
                            style={{color: focused ? '#055292' : '#748c94', fontSize: 12}}>
                                HOME
                            </Text>
                        </View>
                    )
                }
            }

            /> 

            <Tab.Screen name="Conta" component={Anuncio} 
            
            options={
                {
                    tabBarIcon: ({ focused }) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}> 
                            <Image 
                            source={require('../assets/icons/home.png')} 
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#747c94'
                            }}
                            />
                            <Text
                            style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                                Conta
                            </Text>
                        </View>
                    )
                }
            }

            /> 

        </Tab.Navigator>
    )

}
