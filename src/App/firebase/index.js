import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCvXFr0DXkBefEVrqKlyG6BtJIKdbjgHok',
  authDomain: 'simple-crud-904fa.firebaseapp.com',
  databaseURL: 'https://simple-crud-904fa.firebaseio.com',
  projectId: 'simple-crud-904fa',
  storageBucket: 'simple-crud-904fa.appspot.com',
  messagingSenderId: '554196113472',
};

const fire = firebase.initializeApp(config);

export default fire;
