import React, { useState, useEffect } from 'react';
import axios from "axios";
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { Formik, Field } from 'formik';
import { createGlobalStyle } from 'styled-components';
import api from '../service/api';
import { useNavigation } from '@react-navigation/native';
import { registerStyle } from '../register/registerStyle';
import { Appbar } from 'react-native-paper';
import { AsyncStorage } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { despesaStyle } from './despesaStyle';

export default function AddDespesa() {

    // ------------------------------DATA PICKER----------------------------------
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);;
    };
    // ----------------------------------------------------------------------------

    const navigation = useNavigation();

    const initialState = {
        usuario1: '',
    };

    const [state, setState] = useState(initialState);

    const [idCasa, setIdCasa] = useState();

    const back = () => {
        navigation.navigate('Entrar');
    }

    const buscarCasa = async () => {
        state.usuario1 = await AsyncStorage.getItem('idUsuario') || 'none';
        api.post("inquilino/liberar", state, {
            headers: {
                authorization: await AsyncStorage.getItem('token') || 'none'
            }
        }).then((response) => {
            setIdCasa(response.data.casa.idCasa);
            console.log('Criar despesa liberada com sucesso!');
        });
    }

    useEffect(() => {
        buscarCasa();
    }, [])
    return (
        <SafeAreaView style={registerStyle.responsive}>

            <Appbar>
                <Appbar.BackAction onPress={back} />
            </Appbar>


            <ScrollView>
                <View style={registerStyle.content}>
                    <Formik
                        initialValues={{
                            titulo: '',
                            valor: '',
                            casaId: '',
                            dataValidade: ''
                        }}


                        onSubmit={(values) => {
                            console.log(idCasa);

                            values.casaId = idCasa;
                            values.dataValidade = date;

                            console.log(values.dataValidade);

                            const submitDespesa = async () => {
                                values.usuarioResponsavelId = await AsyncStorage.getItem('idUsuario') || 'none';

                                api.post("despesas", values, {
                                    headers: {
                                        authorization: await AsyncStorage.getItem('token') || 'none'
                                    }
                                }).then((response) => {
                                    navigation.navigate('Entrar');
                                    console.log('Despesa Salvo com sucesso!' + response.data)
                                });
                            }
                            submitDespesa();

                        }}
                    >

                        {(props) => (

                            <View>

                                <TextInput
                                    placeholder='Titulo'
                                    onChangeText={props.handleChange('titulo')}
                                    value={props.values.titulo}
                                />


                                <TextInput
                                    placeholder='Preço'
                                    onChangeText={props.handleChange('valor')}
                                    value={props.values.valor}
                                    keyboardType="phone-pad"
                                />


                                {  /*  <TextInput
                                    placeholder='Inquilino'
                                    onChangeText={props.handleChange('Inquilino')}
                                    value={props.values.inquilino}
                            /> */}

                                <View>
                                    <View style={despesaStyle.vbotao}>
                                        <Button mode="contained" onPress={showDatepicker} title="Show date picker!">Adicionar Vencimento</Button>
                                    </View>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode='date'
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>


                                <Button mode="contained" style={registerStyle.button} onPress={props.handleSubmit} >Registrar Despesa</Button>

                            </View>
                        )}


                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}