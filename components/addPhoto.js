import * as React from 'react';
import { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddPhoto ({ onPhotoChange }) {
  
  const [image, setImage] = useState(null);
  
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
    } catch (E) {
      console.error(E);
    }
  };

  return (
      <View style={{alignItems: 'center', justifyContent: 'center' }}>        
        {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
        <Button title="Add Image" onPress={() => _pickImage()} />
      </View>
    );
}