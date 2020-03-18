import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCGzIIMgNJTcavqqQ-A5uJpnsWUdB-Vqog",
    authDomain: "awesometsproject-76f9e.firebaseapp.com",
    databaseURL: "https://awesometsproject-76f9e.firebaseio.com",
    projectId: "awesometsproject-76f9e",
    storageBucket: "awesometsproject-76f9e.appspot.com",
    messagingSenderId: "1021483276911",
    appId: "1:1021483276911:web:8228e8d1176a045c03cb9a",
    measurementId: "G-L90SPLHKQR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth();
