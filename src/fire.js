import firebase from 'firebase'

var config = {
    // paste here your config you get from your Firebase project Overview
  };

var fire = firebase.initializeApp(config);

export default fire;