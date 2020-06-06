import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert } from 'react-native';

  import Calendar from '../components/calendar';

  export default function Home({ navigation }) {

      return(
          <View style={styles.container}>
            <Calendar />
          </View>
      )
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
