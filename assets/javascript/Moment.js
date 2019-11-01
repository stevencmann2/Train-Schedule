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


 /////////// DECLARE INITAL VARIABLES \\\\\\\\\\\\\\\\
 let trainName = "";
 let destination = "";
 let frequency = "";
 let nextArrival = "";
 let minutesAway = "";


 let firstTrain = "";

 database.ref().set({
     Train: trainName,
     Destination: destination,
     Frequency: frequency,

 });


 /////////// CAPTURE BUTTON CLICK FOR FORM SUBMIT\\\\\\\\\\\\\\

 $("#submission").on("click", function (event) {

     event.preventDefault();

     // obtain text values -- form

     trainName = $("#train-name").val().trim();
     destination = $("#destination").val().trim();
     frequency = parseInt($("#frequency").val().trim());
     firstTrain = $("#train-time").val().trim();

     console.log(trainName);
     console.log(destination);
     console.log(frequency);
     console.log(firstTrain);

     //create local temporary object for train data

     let newTrain = {
         train: trainName,
         destination: destination,
         frequency: frequency,

     }

     //push to database
     database.ref().push(newTrain);

     console.log(newTrain.train)
     console.log(newTrain.destination)
     console.log(newTrain.frequency)

     //clear text boxes in form
     $("#train-name").val("");
     $("#destination").val("");
     $("#frequency").val("");
     $("#train-time").val("");






     //set values in database
     /*
         database.ref().push({
             train: trainName,
             destination: destination,
             frequency: frequency,

         });
         */

 });

 database.ref().on("value", function (snapshot) {
     // Print the initial data to the console
     console.log(snapshot.val());

     // Log the value of the various properties
     console.log(snapshot.val().train);
     console.log(snapshot.val().destination);
     console.log(snapshot.val().frequency);

     $("#train-name1").text(snapshot.val().train);
     $("#destination1").text(snapshot.val().destination);
     $("#frequency1").text(snapshot.val().frequency);

 })

 database.ref().on("child_added", function (childSnapshot, prevChildKey) {

     //$("#train-name1").text(snapshot.val().train);
    // $("#destination1").text(snapshot.val().destination);
     //$("#frequency1").text(snapshot.val().frequency);

     //store variables
     let trainName= childSnapshot.val().train;
     let frequency= childSnapshot.val().frequency;
     let destination = childSnapshot.val().destination;

     console.log(trainName);
     console.log(frequency);
     console.log(destination);

     //// add each to table 
     $(".trainTable").append("<tr><td>" + trainName + "</td><td>" + frequency + "</td><td>" + destination +"</td>") 









 });