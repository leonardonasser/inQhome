import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const Topo = (props) => {

    const navigation = useNavigation();

    const back= () => {
        navigation.navigate('Login');
    }

    return (
        <Appbar>
            <Appbar.BackAction onPress={back} />
            <Appbar.Content title={props.title}  />
        </Appbar>
    )
}
