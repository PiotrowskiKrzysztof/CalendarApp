import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, CheckBox, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import firebase from '../api/firebase';

export default function Tag({item, tags, addTagToNote}) {

    const deleteTag = (key) => {
        firebase.database()
        .ref('/Tags')
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                if(key == child.key) {
                    firebase.database().ref('/Tags/' + child.key).remove()
                }
            })
        })
    }

    return(
        <TouchableOpacity
            style={{
                backgroundColor: item.color,
                marginTop: 10, borderRadius: 25,
                flexDirection: 'row',
                alignItems: 'space-between',
                padding: 5,
            }}
            onPress={() => addTagToNote(item.key, item.color, item.text)}         
        >
            <Text style={styles.item}> {item.text} </Text>
            <MaterialIcons
                name='delete'
                color='white'
                size={20}
                onPress={() => deleteTag(item.key)}
                style={styles.deleteTagButton}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        color: 'white',
        marginTop: 8,
        width: 170,
        height: 30,
        marginLeft: 10,
        alignSelf: 'center',
    },
    deleteTagButton: {
        marginRight: 10,
        alignSelf: 'center',
    }
})