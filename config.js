import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyD1SSsrC6u-LUZpon0v6noLriS0J6XQzmc",
    authDomain: "book-santa-bb19c.firebaseapp.com",
    databaseURL: "https://book-santa-bb19c.firebaseio.com",
    projectId: "book-santa-bb19c",
    storageBucket: "book-santa-bb19c.appspot.com",
    messagingSenderId: "469086894157",
    appId: "1:469086894157:web:d4d86f87bf5c80b13ec404"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();