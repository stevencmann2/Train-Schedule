//Javascript for Train scheduler activity 

///Time functtion to display to the current time
function currentTimeDisplay() {
    const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#current-time-display").text(time);
    setTimeout(currentTimeDisplay, 1000);
};

$(document).ready(function () {
    currentTimeDisplay();
});

//displaying current time to the user
$("#current-time-display").append(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));


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

let train;
let destination;
let frequency;
let nextArrival;
let minutesAway;
let firstTrain;



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
    const trainName = childSnapshot.val().train;
    const frequency = childSnapshot.val().frequency;
    const destination = childSnapshot.val().destination;
    const firstTrain = childSnapshot.val().nextArrival;


    // THIS WILL CONTAIN CALCULATION FOR NEXT ARRIVAL & MINUTES AWAY
    //using frequency & first train declared above

    const nextArrivalConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    //console.log(nextArrivalConverted);

    // Current Time
    const now = moment();
   // console.log("CURRENT TIME: " + moment(now).format("hh:mm"));

    // Difference between currentTietimes
    const diffTime = now.diff(moment(nextArrivalConverted), "minutes");
   // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    const tRemainder = diffTime % frequency;
    //console.log(tRemainder);

    // Minute Until Train
    const tMinutesTillTrain = frequency - tRemainder;
   //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    const nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //console.log(nextTrain);



    /////////////////////////////////////////////////////////////////////////////////

    //// add each to table 
    $(".trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td>");

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});