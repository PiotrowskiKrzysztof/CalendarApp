import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert } from 'react-native';
import ItemNotes from '../components/itemNotes';
import { MaterialIcons } from '@expo/vector-icons';
import AddNotes from '../components/addNotes';
import { globalStyles } from '../styles/global';
import firebase from '../api/firebase';

export default function ItemNotesList({ selectedDate }) {

  const [modalOpen, setModalOpen] = useState(false);

  const [todos, setTodos] = useState([]);

  useEffect(() => {   
    

    const refreshAfterAdd = () => {
      firebase.database()
      .ref('/ItemList')
      .on('child_added', snapshot => {
        // console.log(snapshot.key);
        firebase.database().ref('/ItemList/' + snapshot.key).update({ key: snapshot.key })
        
      });
    }
    refreshAfterAdd();

    firebase.database()
    .ref('/ItemList')
    .on('value', snapshot => {
        if(snapshot.val() != null) {
          let items = Object.values(snapshot.val());
          setTodos(items);
        }              
    });
  }, [])

  const deleteItem = (key) => {
    firebase.database()
    .ref('/ItemList')
    .once('value', snapshot => {
      snapshot.forEach((child) => {
        if(key == child.key) {
          firebase.database().ref('/ItemList/' + child.key).remove()
        }
        if(snapshot.numChildren() == 1) {
          firebase.database().ref('/ItemList').set('')
        }
      })
    })
  }

  const correctDate = ( tmpItem, tmpDate )  => {
    if(tmpItem.item.noteDate == tmpDate)
      return (
        <ItemNotes
          item={tmpItem}
          editDataNote={editDataNote}
          todos={todos}
          deleteItem={deleteItem}
        />
      );
  }

  const addNewNote = (todos, imageUri, backgroundColor) => {
    addNewNoteDatabase(todos, imageUri, backgroundColor);   
    setModalOpen(false);
  }


  const addNewNoteDatabase = (todos, imageUri, backgroundColor) => {
    if(imageUri == null) imageUri = 'noneUri';
    firebase.database().ref('/ItemList/').push({
      title: todos.title,
      body: todos.body,
      noteDate: selectedDate,
      image: imageUri,
      backgroundColor: backgroundColor,
      noteTags: '',
    }); 
  };

  const editDataNote = (key, title, body) => {
    setTodos((prevTodos) => {
      if(prevTodos.filter(todo => todo.key == key)) {
        todos.title = title;
        todos.body = body;
      }
      return [...todos];      
    });
  }
  
  return(       
    <View style={styles.container}>
      
      <Modal visible={modalOpen}>        
        <View style={styles.containerModal}>
          <AddNotes
            addNewNote={addNewNote}
          />
          <MaterialIcons 
            name='close'
            size={30}
            color='white'
            style={globalStyles.circleButton}
            onPress={() => setModalOpen(false)}
          />           
        </View>
      </Modal>
      
      <FlatList
          data={ todos }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
              correctDate({item}, selectedDate)
          )}                          
      />
      <MaterialIcons 
        name='add'
        size={30}
        color='white'
        style={globalStyles.circleButton}
        onPress={() => setModalOpen(true)}
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  containerModal: {
    flex: 1,
  }
})