import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, } from 'react-native-paper';
import Login from './src/pages/login/login';
import { theme } from './AppStyle';
import RegisterScreen from './src/pages/register/register';
import Anuncio from './src/pages/anuncio/anuncio';
import ImageScreen from './src/pages/image/ImageScreen';
import TelaAnuncio from './src/pages/anuncio/telaAnuncio';
import MensageriaChat from './src/pages/mensageria/mensageriaChat';
import Perfil from './src/pages/perfil/perfil';
import AddDespesa from './src/pages/despesas/addDespesa';


const Stack = createStackNavigator();

export default () => {
  return (

    <PaperProvider theme={theme}>

      <NavigationContainer>
        <Stack.Navigator

          screenOptions={{
            tabBarShowLabel: true,
            headerShown: false,
          }}

        >

{ /*<Stack.Screen
            name="Despesa"
            component={NewDespesa}
/> */}

          {/* <Stack.Screen
            name="Perfil"
            component={Perfil}
          /> */}



          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="AddDespesa"
            component={AddDespesa}
          />

          <Stack.Screen
            name="Entrar"
            component={Routes}
          />

          <Stack.Screen
            name="TelaAnuncio"
            component={TelaAnuncio}

            options={{
              tabBarShowLabel: true,
              headerShown: true,
            }}

          />

          <Stack.Screen
            name="MensageriaChat"
            component={MensageriaChat}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />

          <Stack.Screen name='Anuncio' component={Anuncio}
            options={{
              tabBarShowLabel: true,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name='ImageScreen'
            component={ImageScreen}
            options={{
              title: 'Selected 0 files',
              tabBarShowLabel: true,
              headerShown: true,
            }}

          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}