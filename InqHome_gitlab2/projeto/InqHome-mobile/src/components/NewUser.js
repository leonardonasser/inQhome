import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function NewUser(props) {
    return (

        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <View style={styles.avatarRow}>
            <Image
                source={require('../assets/noimage.jpg')}
                style={styles.avatar}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{props.nome}</Text>
            </View>
            </View>

            <Text style={styles.description}>
                {props.dataHora}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#FFF',
        height: 150,
        width: Dimensions.get('window').width,
        elevation: 2,
        borderRadius: 10,
        padding: 15,
        marginRight: 30,
        marginLeft: 2,
        marginBottom: 5,
        flexDirection: 'row',
    },
    cover: {
        width: 200,
        height: 140,
        borderRadius: 10,

    },

    content: {
        marginLeft:10,
        marginVertical: 10,
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems:'center',
    },

    content02: {

        alignItems: 'center',

    },

    title: {
        fontSize: 20,
        color: '#4f4a4a'
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 12,
        backgroundColor: 'red',
        marginHorizontal: 12,
    },
    badge: {
        color: 'red',
        fontSize: 14,
    },
    description: {
        fontSize: 15,
        color: '#4f4a4a',
        alignItems:'flex-end',
        padding:0,
        marginLeft:'20%',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: '100%'
    },
    price: {
        fontSize: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius:35,
    },

});