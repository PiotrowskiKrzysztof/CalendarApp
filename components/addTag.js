import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function AddTag({ addNewTag }) {

    const [text, setText] = useState('');

    const [tagColor, setTagColor] = useState('#D1D1D1');
    
    const setTextTag = (value) => {
        setText(value);
    };

    const changeTagColor = (color) => {
        setTagColor(color);
    }

    const submitTag = () => {
        addNewTag(text, tagColor);
        Alert.alert(
            'Added',
            'You added tag: ' + text,
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <TextInput
                    style={styles.inputNoteSmall}
                    placeholder='new tag ...'
                    onChangeText={setTextTag}
                />
                <MaterialIcons
                    name='add'
                    size={30}
                    color='green'
                    onPress={submitTag}
                    style={styles.buttonAddNewNoteSmall}
                />            
            </View>
            <View style={styles.rowColor}>
                <TouchableOpacity style={styles.greenColor} onPress={() => changeTagColor('#00DA07')}></TouchableOpacity>
                <TouchableOpacity style={styles.blueColor} onPress={() => changeTagColor('#00DAD7')}></TouchableOpacity>
                <TouchableOpacity style={styles.orangeColor} onPress={() => changeTagColor('#DA9500')}></TouchableOpacity>
                <TouchableOpacity style={styles.yellowColor} onPress={() => changeTagColor('#DAD300')}></TouchableOpacity>
                <TouchableOpacity style={styles.purpleColor} onPress={() => changeTagColor('#DAD300')}></TouchableOpacity>
                <TouchableOpacity style={styles.redColor} onPress={() => changeTagColor('#DA0000')}></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputNoteSmall: {
        flex: 10,
        paddingVertical: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
    },
    flexRow: {
        flexDirection: 'row',        
        marginTop: 15,
        marginLeft: 20,
    },
    buttonAddNewNoteSmall: {
        flex: 2,
        paddingVertical: 5,
        alignSelf: 'flex-end',
        marginLeft: 10,
    },
    rowColor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
    },
    greenColor: {
      width: 30,
      height: 30,
      backgroundColor: '#00DA07',
      borderRadius: 25,
      marginBottom: 10,
      borderRadius: 50,
  },
  blueColor: {
      width: 30,
      height: 30,
      backgroundColor: '#00DAD7',
      borderRadius: 25,
      marginBottom: 10,
      borderRadius: 50,
  },
  orangeColor: {
      width: 30,
      height: 30,
      backgroundColor: '#DA9500',
      borderRadius: 25,
      marginBottom: 10,
      borderRadius: 50,
  },
  yellowColor: {
      width: 30,
      height: 30,
      backgroundColor: '#DAD300',
      borderRadius: 25,
      marginBottom: 10,
      borderRadius: 50,
  },
  purpleColor: {
        width: 30,
        height: 30,
        backgroundColor: '#7000DA',
        borderRadius: 25,
        marginBottom: 10,
        borderRadius: 50,
  },
  redColor: {
        width: 30,
        height: 30,
        backgroundColor: '#DA0000',
        borderRadius: 25,
        marginBottom: 10,
        borderRadius: 50,
  },
})