import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Image, Modal, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { globalStyles } from '../styles/global';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const validationNoteSchema = yup.object({
  title: yup.string().required().min(3)
})

export default function AddNotes({ addNewNote }) {

    const [image, setImage] = useState(null);

    const [modalColor, setModalColor] = useState(false);

    const[backgroundColor, setBackgroundColor] = useState('white');

    const changeBackground = (color) => {
        setBackgroundColor(color);
        setModalColor(false);
    }
  
    const _pickImage = async () => {
        try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri)
        }
    
        console.log(result);
        } catch (E) {
        console.error(E);
        }
    };
    
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>           
            <View style={{flex: 1, backgroundColor: backgroundColor}}>
                <Modal
                    visible={modalColor}
                    transparent={true}
                >
                    <View style={styles.containerModal}>
                        <View style={styles.modalSize}>
                            <Text>Set background color</Text>
                            <TouchableOpacity style={styles.greenColor} onPress={() => changeBackground('#C3FFAE')}></TouchableOpacity>
                            <TouchableOpacity style={styles.blueColor} onPress={() => changeBackground('#AEFFEF')}></TouchableOpacity>
                            <TouchableOpacity style={styles.orangeColor} onPress={() => changeBackground('#FFE3AE')}></TouchableOpacity>
                            <TouchableOpacity style={styles.yellowColor} onPress={() => changeBackground('#F4FFAE')}></TouchableOpacity>
                            <TouchableOpacity style={styles.purpleColor} onPress={() => changeBackground('#C9AEFF')}></TouchableOpacity>
                            <TouchableOpacity style={styles.whiteColor} onPress={() => changeBackground('white')}></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Notes</Text>
                </View>
                {/* Picture */}
                <View style={{alignItems: 'center', justifyContent: 'center' }}>        
                    {image && <Image source={{ uri: image }} style={globalStyles.image} />}                            
                </View>        
                <View style={styles.content}>                    
                    <Formik
                        initialValues={{ title: '', body: '', key: '', noteDate: '', image: '' }}
                        validationSchema={validationNoteSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            addNewNote(values, image, backgroundColor);
                        }}
                    >
                    {/* Przesyłanie danych */}
                    {(props) => (
                        <View>
                            {/* Przesłanie tytułu */}
                            <TextInput 
                                style={globalStyles.input}
                                placeholder='Title note'
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                                onBlur={props.handleBlur('title')}
                            />
                            <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title }</Text>
                            <TextInput 
                                style={globalStyles.input}
                                placeholder='Description'
                                onChangeText={props.handleChange('body')}
                                value={props.values.body}
                                onBlur={props.handleBlur('body')}
                                multiline={true}
                            />
                            <Button
                                onPress={props.handleSubmit}
                                title='add notes'
                                color='green'
                                          
                            />
                        </View>
                    )}
                    </Formik>
                </View>
                {/* AddPicture Button */}
                <MaterialIcons 
                    name='image'
                    size={30}
                    color='white'
                    style={styles.imageButton}
                    onPress={() => _pickImage()}
                />
                {/* AddColor Button */}
                <MaterialIcons 
                    name='format-color-fill'
                    size={30}
                    color='white'
                    style={styles.colorButton}
                    onPress={() => setModalColor(true)}
                />                
            </View>            
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 15,
    marginBottom: 70,
  },
  colorButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 15,
    marginBottom: 125,
  },
  header: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    backgroundColor : "#0000",
    borderBottomWidth: 0,
    backgroundColor: 'white',
  },
  headerText: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
          
  },
  containerModal: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalSize: {
      width: 300,
      height: 350,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
            width: 0,
            height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  greenColor: {
      width: 200,
      height: 30,
      backgroundColor: '#C3FFAE',
      borderRadius: 25,
      marginBottom: 10,
      marginTop: 20,
  },
  blueColor: {
      width: 200,
      height: 30,
      backgroundColor: '#AEFFEF',
      borderRadius: 25,
      marginBottom: 10,
  },
  orangeColor: {
      width: 200,
      height: 30,
      backgroundColor: '#FFE3AE',
      borderRadius: 25,
      marginBottom: 10,
  },
  yellowColor: {
      width: 200,
      height: 30,
      backgroundColor: '#F4FFAE',
      borderRadius: 25,
      marginBottom: 10,
  },
  purpleColor: {
      width: 200,
      height: 30,
      backgroundColor: '#C9AEFF',
      borderRadius: 25,
      marginBottom: 10,
  },
  whiteColor: {
      width: 200,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 25,
      marginBottom: 10,
      borderWidth: 1,
  },
})