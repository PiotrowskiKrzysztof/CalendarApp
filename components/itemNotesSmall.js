import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, CheckBox, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import firebase from '../api/firebase';

export default function ItemNotesSmall({item, deleteNoteSmall}) {
    
    const [checkBox, setCheckBox] = useState(item.state);

    // useEffect(() => {       
    //     return setCheckBox(item.state);
    // }, [checkBox])

    const saveCheckBoxState = () => {

        firebase.database().ref('/ItemList/' + item.parentKey + '/' + item.key).update({
            state: checkBox,
        })
    }

    return(
        <TouchableOpacity style={styles.item}
            onPress={ saveCheckBoxState( checkBox ) }
        >
            <View style={styles.groupCheckBox}>                
                <CheckBox
                    value={checkBox}
                    onValueChange={setCheckBox}
                />
                <Text>{item.text}</Text>
            </View>
            <MaterialIcons
                name='delete'
                size={16}
                onPress={() => deleteNoteSmall(item.key)}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 15,
        paddingBottom: 5,
        borderColor: '#bbb',        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    groupCheckBox: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})