 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAZVnBbb-yaGlmhkx-XwmIXqJ8H72v281I",
    authDomain: "train-a8af5.firebaseapp.com",
    databaseURL: "https://train-a8af5.firebaseio.com",
    projectId: "train-a8af5",
    storageBucket: "train-a8af5.appspot.com",
    messagingSenderId: "590417460090",
    appId: "1:590417460090:web:069cfbe88db5c3eb59f4c3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const database = firebase.database();
console.log(database);

database.ref().set({
    Train: "working?"
});