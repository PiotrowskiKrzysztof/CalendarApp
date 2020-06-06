import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function AddNotesSmall({ addNewNoteSmall }) {

    const [text, setText] = useState('');
    
    const setTextNoteSmall = (value) => {
        setText(value);
    };    

    return(
        <View style={styles.flexRow}>
            <TextInput
                style={styles.inputNoteSmall}
                placeholder='new todo ...'
                onChangeText={setTextNoteSmall}
            />
            <MaterialIcons
                name='add'
                size={30}
                color='green'
                onPress={() => addNewNoteSmall(text)}
                style={styles.buttonAddNewNoteSmall}
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    inputNoteSmall: {
        flex: 11,
        paddingVertical: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,       
        
    },
    flexRow: {
        flexDirection: 'row',        
        marginTop: 15,
    },
    buttonAddNewNoteSmall: {
        flex: 1,
        paddingVertical: 5,
        alignSelf: 'flex-end',
        marginLeft: 10,
    }
})