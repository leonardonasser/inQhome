import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function NewDespesa(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>

            <View style={styles.content02}>
                <Image
                    source={props.cover}
                    style={styles.cover}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{props.name}</Text>
            </View>

            <Text style={styles.description}>
                {props.description}
            </Text>


            <View style={styles.footer}>
                <View style={{ width: '80%' }}>
                    <Text style={styles.price}>R$ {props.prince}</Text>
                </View>

            </View>

            <View style={styles.content}>
                <Text style={styles.title2}>{props.inquilino}</Text>


                <View style={styles.dot}>
                </View>

                <Text style={styles.badge}>Não pago</Text>

            </View>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#FFF',
        height: 300,
        width: Dimensions.get('window').width,
        elevation: 2,
        borderRadius: 10,
        padding: 15,
        marginRight: 30,
        marginLeft: 2,
        marginBottom: 5,
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
    title2: {
        fontSize: 18,
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