import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function NewChat(props) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{props.texto}</Text>
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
        display: 'flex',
        width: Dimensions.get('window').width - 120,
        elevation: 2,
        borderRadius: 10,
        padding: 15,
        marginRight: 10,
        marginBottom: 5,
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    cover: {
        width: 200,
        height: 140,
        borderRadius: 10,

    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
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
        color: '#4f4a4a'
    },
    footer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: '100%'
    },
    price: {
        fontSize: 20,
    }
});