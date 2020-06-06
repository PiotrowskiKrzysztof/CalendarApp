import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import ItemNotesList from '../components/itemNotesList';
 
export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          onDateChange={ this.onDateChange }
          selectedDayColor='green'
        />
 
        <View style={styles.containerList}>
          <ItemNotesList
            selectedDate={ startDate }         
          />
          
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  containerList: {
    flex: 1,
    marginTop: 10,
  }
});