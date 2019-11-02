 //Referencing and Logging moment.js
 const m = moment();
 console.log(m.format("h mm A"));
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
 //console.log(database);


 /////////// DECLARE INITAL VARIABLES \\\\\\\\\\\\\\\\

 let train ;
 let destination ;
 let frequency ;
 let nextArrival ;
 let minutesAway ;
 let firstTrain ;

 /////might need to put this back in 


 // this will be for local values, it gathers snapshot from the database to be loaded later
// 
// database.ref().on("value", function(snapshot) {
    
//     let train = snapshot.val().train;
//     let destination = snapshot.val().destination;
//     let frequency = snapshot.val().frequency;
//     let convertedMinutes = snapshot.val().minutesAway;      /////// need to detemrine this
//     let nextArrival = snapshot.val().nextArrival;           //////need to determine this
    
//     // Log the value of the various properties
//     console.log(snapshot.val());
//     console.log(snapshot.val()["-LsgYg91hCzJfEQgmcVD"].train);
//     console.log(snapshot.val().destination);
//     console.log(snapshot.val().frequency);
//     console.log(snapshot.val().minutesAway);
//     console.log(snapshot.val().nextArrival);

//     ///////////NEEEEEEEED TO ADD IN MINUTES AWAYYY LATERRRRRRRR|||||||||||

//     $(".trainTable").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td><td>" + convertedMinutes + "</td>");


// });

 /////////// CAPTURE BUTTON CLICK FOR FORM SUBMIT\\\\\\\\\\\\\\

 $("#submission").on("click", function (event) {

     event.preventDefault();

     // obtain text values -- form

     trainName = $("#train-name").val().trim();
     destination = $("#destination").val().trim();
     frequency = parseInt($("#frequency").val().trim());
     firstTrain = $("#train-time").val().trim();



     //create local temporary object for train data

     let newTrain = {
         train: trainName,
         destination: destination,
         frequency: frequency,
         nextArrival: firstTrain,
     }

     console.log(newTrain);
     //push to database
     database.ref().push(newTrain);

     //clear text boxes in form
     $("#train-name").val("");
     $("#destination").val("");
     $("#frequency").val("");
     $("#train-time").val("");


    });

 database.ref().on("child_added", function (childSnapshot) {
    

     //store variables
     let trainName = childSnapshot.val().train;
     let frequency = childSnapshot.val().frequency;
     let destination = childSnapshot.val().destination;
     let firstTrain = childSnapshot.val().nextArrival;
        console.log(trainName);

     //converted Next Arrival to AM PM
     let finalArrival = moment(firstTrain, "h mm A");
     //console.log(finalArrival);

     //minutesaway variable//
     let convertedMinutes = moment(firstTrain, "h mm").toNow(true);
     console.log(convertedMinutes);
     // console.log(convertedMinutes);

     //// add each to table 
     $(".trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrain + "</td><td>" + convertedMinutes + "</td>");

 });

   