import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, FlatList, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import ItemNotesSmall from '../components/itemNotesSmall';
import AddNotesSmall from '../components/addNotesSmall';
import Tag from '../components/tag';
import NoteTag from '../components/noteTag';
import NoteTagSmall from '../components/noteTagSmall';
import AddTag from '../components/addTag';
import firebase from '../api/firebase';

export default function ItemNotes({ item, deleteItem, todos }) {
    
    const [modalReviewDetails, setModalReviewDetails] = useState(false);

    const [todosSmall, setTodosSmall] = useState([]);

    const [title, onChangeTitle] = useState(item.item.title);

    const [body, onChangeBody] = useState(item.item.body);

    const [backgroundColor, setBackgroundColor] = useState(item.item.backgroundColor);

    const [modalColor, setModalColor] = useState(false);

    const [modalTags, setModalTags] = useState(false);

    const [tags, setTags] = useState([]);

    const [notesTags, setNotesTags] = useState([]);

    // const [noteTagsSmall, setNoteTagSmall] = useState([]);

    useEffect(() => {
        firebase.database()
        .ref('/ItemList/' + item.item.key)
        .on('value', snapshot => {
            if(snapshot.val() != null) {
                let items = Object.values(snapshot.val());
                items.splice(items.indexOf(item.item.noteDate), 1);
                items.splice(items.indexOf(title), 1);
                items.splice(items.indexOf(body), 1);
                items.splice(items.indexOf(item.item.key), 1);
                items.splice(items.indexOf(item.item.image), 1);
                items.splice(items.indexOf(item.item.backgroundColor), 1);
                items.splice(items.indexOf(item.item.noteTags), 1);           
                setTodosSmall(items);
            }
        });

        const refreshAfterAdd = () => {
            firebase.database()
            .ref('/Tags')
            .on('child_added', snapshot => {
                firebase.database().ref('/Tags/' + snapshot.key).update({ key: snapshot.key })
                
            });
        }
        refreshAfterAdd();

        firebase.database()
        .ref('/ItemList/' + item.item.key + '/noteTags')
        .on('value', snapshot => {                
            if(snapshot.val() != null) {
                let items = Object.values(snapshot.val());
                setNotesTags(items);
            }
        });

        firebase.database()
        .ref('/Tags')
        .on('value', snapshot => {
            if(snapshot.val() != null) {
                let items = Object.values(snapshot.val());
                setTags(items);
            }              
        });
    }, [todos])    

    const deleteNoteSmall = (key) => {
        firebase.database()
        .ref('/ItemList/' + item.item.key)
        .once('value', snapshot => {
            snapshot.forEach((child) => {
                if(key == child.key) {
                    firebase.database().ref('/ItemList/' + '/' + item.item.key + '/' + child.key).remove()
                }                      
            }) 
            
        });
    }

  const addNewNoteSmall = (text) => {
    firebase.database().ref('/ItemList/' + item.item.key).push({
        parentKey: item.item.key,
        text: text,
        state: false,
    });
    firebase.database()
    .ref('/ItemList/' + item.item.key)
    .on('child_added', snapshot => {
        if(snapshot.key != 'body' && snapshot.key != 'key' && snapshot.key != 'noteDate' && snapshot.key != 'title' && snapshot.key != 'image' && snapshot.key != 'undefined' && snapshot.key != 'noteTags' && snapshot.key != 'backgroundColor') {
            firebase.database().ref('/ItemList/' + item.item.key + '/' + snapshot.key).update({ key: snapshot.key })
            
        }
    });  
  }

  const addNewTag = (text, tagColor) => {
    firebase.database().ref('/Tags').push({
        text: text,
        color: tagColor,
    });
    firebase.database()
    .ref('/Tags')
    .on('child_added', snapshot => {       
        firebase.database().ref('/Tags/' + snapshot.key).update({ key: snapshot.key })
    }); 
  }

  const addTagToNote = (key, color, text) => {
    // console.log('key: ' + key);
    // console.log('text: ' + text);
    // console.log('color: ' + color);
    // console.log('------------');
    firebase.database().ref('/ItemList/' + item.item.key + '/noteTags/' + key).set({
        key: key,
        color: color,
        text: text,
        parentKey: item.item.key,
    });
  }

  const closeItem = () => {
      setModalReviewDetails(false);
      updateTitle(title);
      updateBody(body);
  }
  
  const updateTitle = (newTitle) => {
    let childKey = '';
    firebase.database()
    .ref('/ItemList')
    .once('value', snapshot => {
      snapshot.forEach((child) => {
        childKey = child.key;
        if(item.item.key == childKey) {        
          firebase.database().ref('/ItemList/' + childKey).update({
              title: newTitle,
          })
        }
      })   
    });    
  }
  const updateBody = (newBody) => {
    let childKey = '';
    firebase.database()
    .ref('/ItemList')
    .once('value', snapshot => {
      snapshot.forEach((child) => {
        childKey = child.key;    
        if(item.item.key == childKey) {        
          firebase.database().ref('/ItemList/' + childKey).update({
              body: newBody,
          })
        }
      })   
    });
  }

    const changeBackground = (color) => {
        setBackgroundColor(color);
        setModalColor(false);
        let childKey = '';
        firebase.database()
        .ref('/ItemList')
        .once('value', snapshot => {
        snapshot.forEach((child) => {
            childKey = child.key;    
            if(item.item.key == childKey) {        
                firebase.database().ref('/ItemList/' + childKey).update({
                    backgroundColor: color,
                })
            }
        })   
        });
    }   

    return (
        <TouchableOpacity
            style={{padding: 16,marginTop: 16,borderColor: '#bbb',borderWidth: 1,borderStyle: 'dashed',borderRadius: 10,flexDirection: 'row',justifyContent: 'space-between', backgroundColor: backgroundColor}}
            onPress={() => setModalReviewDetails(true)}            
        >
            <Text style={styles.titleNote}>{title}</Text>            
            {/* SMALL TAGS */}
            <FlatList
                horizontal={true}
                data={notesTags}                                
                renderItem={({ item }) => <NoteTagSmall item={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
            <MaterialIcons
                name='delete'
                size={20}
                onPress={() => deleteItem(item.item.key)}
                style={styles.deleteNote}
            />
            <Modal visible={modalReviewDetails}>

                {/* BACKGROUND COLOR */}
                <Modal
                    visible={modalColor}
                    transparent={true}
                >
                    <View style={styles.containerModal}>
                        <View style={styles.modalSize}>
                            <MaterialIcons 
                                name='close'
                                size={15}
                                color='green'
                                style={styles.closeBackgroundColorButton}
                                onPress={() => setModalColor(false)}
                            />
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

                {/* TAGS */}
                <Modal
                    visible={modalTags}
                    transparent={true}
                >
                    <View style={styles.containerModal}>
                        <View style={styles.modalSize}>
                            <MaterialIcons 
                                name='close'
                                size={15}
                                color='green'
                                style={styles.closeTagButton}
                                onPress={() => setModalTags(false)}
                            />
                            <FlatList
                                data={tags}                                
                                renderItem={({ item }) => <Tag item={item} tags={tags} addTagToNote={addTagToNote} />}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <AddTag
                                addNewTag={addNewTag}
                            />
                        </View>
                    </View>
                </Modal>
                <Image
                    style={{ width: '100%', height: 200, backgroundColor: backgroundColor }}
                    source={{ uri: item.item.image }}
                />
                <View style={{ flex: 1, paddingBottom: 10, paddingHorizontal: 20, backgroundColor: backgroundColor }}>                
                    <TextInput
                        style={styles.title}
                        onChangeText={text => onChangeTitle(text)}
                        value={title}                        
                    />
                    <View style={styles.containerNoteTags}>
                        <FlatList
                            horizontal={true}
                            data={notesTags}                                
                            renderItem={({ item }) => <NoteTag item={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <TextInput
                        onChangeText={text => onChangeBody(text)}
                        value={body}
                    />
                    <AddNotesSmall addNewNoteSmall={addNewNoteSmall} />
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.listTodosSmall}
                        data={todosSmall}
                        renderItem={({item}) => (
                            <ItemNotesSmall
                                item={item}
                                deleteNoteSmall={deleteNoteSmall}
                            />
                        )}
                    />                   
                </View>
                <MaterialIcons 
                    name='close'
                    size={30}
                    color='white'
                    style={globalStyles.circleButton}
                    onPress={closeItem}
                />
                <MaterialIcons 
                    name='format-color-fill'
                    size={30}
                    color='white'
                    style={styles.colorButton}
                    onPress={() => setModalColor(true)}
                />
                <MaterialIcons 
                    name='label-outline'
                    size={30}
                    color='white'
                    style={styles.tagButton}
                    onPress={() => setModalTags(true)}
                />    
            </Modal>
        </TouchableOpacity>        
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
  title: {
        fontSize: 40,
        marginBottom: 35,
        marginTop: 50,
  },
  listTodosSmall: {
        marginTop: 20,
  },
  colorButton: {
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 50,
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 15,
        marginBottom: 70,
  },
  tagButton: {
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 50,
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 15,
        marginBottom: 125,
  },
  containerModal: {
      flex: 1,
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
  closeBackgroundColorButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 15,
        marginTop: 15,
  },
  closeTagButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 15,
        marginTop: 15,
  },
  containerNoteTags: {
      flexDirection: 'row',
      width: '100%',
  },
  titleNote: {
      alignSelf: 'center',
      marginRight: 20,
  },
  deleteNote: {
      alignSelf: 'center',
  },
})