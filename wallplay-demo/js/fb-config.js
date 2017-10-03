// Initialize Firebase
var config = {
  apiKey: "AIzaSyDiA5PibSf2cEAmE6MACAl-sB0Q1qrdnbk",
  authDomain: "test-form-31271.firebaseapp.com",
  databaseURL: "https://test-form-31271.firebaseio.com",
  storageBucket: "test-form-31271.appspot.com",
  messagingSenderId: "647722372623"
};
firebase.initializeApp(config);
// INIT STORAGE REFERENCE
  const storage = firebase.storage();
        storageRef = storage.ref();
console.log("FB INIT'D with STORAGE REF: " + storageRef);