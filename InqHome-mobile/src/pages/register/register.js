import React from 'react';
import axios from "axios";
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { registerStyle } from './registerStyle';
import { Topo } from '../../components/headerComponent';
import { Formik, Field } from 'formik';
import { createGlobalStyle } from 'styled-components';
import api from '../service/api';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

export default function RegisterScreen() {
  
    const navigation = useNavigation();
    const validationSchema = Yup.object({
         nome: Yup.string()
          .trim()
          .min(3, 'Nome invalido!')
          .required('Nome é obrigatório!'),
        email: Yup.string().email('Email Invalido!').required('Nome é obrigatório!'),
        senha: Yup.string()
          .trim()
          .min(8, 'Senha está muito curto!')
          .required('Senha é obrigatório!'),
          senhaConfirm: Yup.string().equals(
          [Yup.ref('senha'), null],
          'Senha não corresponde!'
        ),
      });

    return (
        <SafeAreaView style={registerStyle.responsive}>
            <ScrollView>
                <Topo />
                <View style={registerStyle.content}>
                    <Formik
                        initialValues={{
                            nome: '',
                            email: '',
                            senha: '',
                            senhaConfirm: '',
                            telefone: ''
                        }}
                        
                      
                        onSubmit={(values) => {

                            console.log("foi")

                            api.post("auth", values).then((response) => {
                                navigation.navigate('Login');
                                console.log('Usuario Salvo com sucesso!' + response.data)
                            });

                        }}
                    >

                        {(props) => (

                            <View>

                                <TextInput
                                    placeholder='Nome'
                                    onChangeText={props.handleChange('nome')}
                                    value={props.values.nome}
                                />


                                <TextInput
                                    placeholder='Email'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    keyboardType="email-address" />


                                <TextInput
                                    placeholder='Senha'
                                    onChangeText={props.handleChange('senha')}
                                    value={props.values.senha}
                                    secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color} />} />


                                <TextInput
                                    placeholder='Confirmar senha'
                                    onChangeText={props.handleChange('senhaConfirm')}
                                    value={props.values.senhaConfirm}
                                    secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color} />}
                                />

                                <TextInput
                                    placeholder='Número de Telefone'
                                    onChangeText={props.handleChange('telefone')}
                                    value={props.values.telefone}
                                    keyboardType="phone-pad"
                                />


                                <Button mode="contained" style={registerStyle.button} onPress={props.handleSubmit} >Registrar</Button>

                            </View>
                        )}


                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}