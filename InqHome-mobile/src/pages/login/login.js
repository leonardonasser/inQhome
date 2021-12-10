import React from "react";
import { SafeAreaView, View , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginstyle } from "./loginStyle";
import { TextInput, Button, Card } from "react-native-paper";
import { Formik, Field } from 'formik';
import api from '../service/api';
import { AsyncStorage } from "react-native";



export default function Login() {

  const navigation = useNavigation();

  const irToHome = () => {
    navigation.navigate('Entrar');
  }

  const irToRegister = () => {
    navigation.navigate('Register');
  }




  return (
    <SafeAreaView style={loginstyle.content}>

      <View>
        <Formik
          initialValues={{
            email: '',
            senha: '',
          }}

          onSubmit={(values) => {
            console.log("foi")

            api.post("auth/login", values).then((response) => {

            const setUsuario = async () => {
              try {
                console.log(response.data.email);
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('idUsuario', response.data.id);
                await AsyncStorage.setItem('nome', response.data.nome);
                await AsyncStorage.setItem('email', response.data.email);
                await AsyncStorage.setItem('telefone', response.data.telefone);
              } catch (error) {
                 console.log(error.message);
              }
            };
            setUsuario();
            
              console.log('Usuario Logado com sucesso!' + response.data)
              navigation.navigate('Entrar');
            });
          }}
        >

          {(props) => (
            <View style={loginstyle.view}>
              
              <View style={loginstyle.center}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={loginstyle.logo}
                />
            
              </View>
              <Card>
                <Card.Content>
                  <TextInput label="Email"   onChangeText={props.handleChange('email')}
                  keyboardType="email-address" style={loginstyle.cardButton}  value={props.values.email}></TextInput>
                  <TextInput label="Senha" onChangeText={props.handleChange('senha')}
                   secureTextEntry={true} style={loginstyle.cardButton}  value={props.values.senha}></TextInput>
                  <Button uppercase={false} style={loginstyle.cardButton}>Recuperar senha</Button>
                  <Button mode="contained" style={loginstyle.cardButton} onPress={props.handleSubmit}>Login</Button>
                  <Button style={loginstyle.cardButton} onPress={irToRegister}>Registrar</Button>
                </Card.Content>
              </Card>
            </View>
          )}
        </Formik>
      </View>

    </SafeAreaView>
  );
}
