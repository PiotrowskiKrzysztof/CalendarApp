import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBc2kZUWpHtjkG13ag_LhpCHJvsEOImtfQ",
  authDomain: "calendarapp-6d63e.firebaseapp.com",
  databaseURL: "https://calendarapp-6d63e.firebaseio.com",
  projectId: "calendarapp-6d63e",
  storageBucket: "calendarapp-6d63e.appspot.com",
  messagingSenderId: "686039513117",
  appId: "1:686039513117:web:e6ef12d533d736747c2ef4",
  measurementId: "G-GPQFZ49K30"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
