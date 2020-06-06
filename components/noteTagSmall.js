import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, CheckBox, View } from 'react-native';
import { globalStyles } from '../styles/global';
import firebase from '../api/firebase';

export default function NoteTagSmall({ item }) {

    const shortText = () => {
        const text = item.text;
        const short = text.charAt(0);
        return short;
    }

    return(
        <View
            style={{              
                borderRadius: 50,
                padding: 2,
                marginRight: 5,
                borderWidth: 1,  
                borderColor: item.color,         
            }}     
        >
            <Text
                style={{
                    color: item.color,
                    
                    height: 20,
                    alignSelf: 'center',
                }}
            > {shortText()} </Text>            
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        // backgroundColor: 'pink',
        color: 'white',
        height: 20,
        alignSelf: 'center',
    },
})