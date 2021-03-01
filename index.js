/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBMYWyIaxiGEy2svWlvDOHrvWkJuGEnSYA",
    authDomain: "student-company-recruit.firebaseapp.com",
    projectId: "student-company-recruit",
    storageBucket: "student-company-recruit.appspot.com",
    messagingSenderId: "829357839923",
    appId: "1:829357839923:web:6ca1bb8333e955f757b546",
    measurementId: "G-MVPWTXZXZ9"
};

firebase.initializeApp(firebaseConfig);
AppRegistry.registerComponent(appName, () => App);
