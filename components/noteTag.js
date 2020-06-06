import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, CheckBox, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import firebase from '../api/firebase';

export default function NoteTag({ item }) {

    const deleteTag = (key) => {        
        firebase.database()
        .ref('/ItemList/' + item.parentKey + '/noteTags')
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                if(key == child.key) {
                    firebase.database().ref('/ItemList/' + item.parentKey + '/noteTags/' + child.key).set(null)
                                                           
                }
                if(snapshot.numChildren() == 1) {
                    firebase.database().ref('/ItemList/' + item.parentKey + '/noteTags').set('')
                }
            })
            
        })
        
    }

    return(
        <TouchableOpacity
            style={{
                backgroundColor: item.color,
                marginTop: 10,
                barginBottom: 25,
                marginRight: 10,
                borderRadius: 25,
                flexDirection: 'row',
                alignItems: 'space-between',
            }}
            onPress={() => deleteTag(item.key)}       
        >
            <Text style={styles.item}> {item.text} </Text>
            <MaterialIcons
                name='delete'
                color='white'
                size={20}                
                style={styles.deleteTagButton}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        // backgroundColor: 'pink',
        color: 'white',
        marginTop: 8,
        height: 30,
        marginLeft: 10,
        alignSelf: 'center',
    },
    deleteTagButton: {
        marginRight: 10,
        alignSelf: 'center',
        // backgroundColor: 'pink',
    }
})