//Application Notes:
// One table for the current train schedule
    //includes train name, destination, frequency, next arrival and minutes away

//allow users to add a new train to the schedule -- maybe with a dropdown menu?
    //train name, destination, first train time (format required HH:mm- military time), frequency

//Need to code the app to calculate the next train arrival, should be relative to current time
    //users from different machines must be able to view the same train times


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9yN5HSxCoes5QDEbXbuZxIfOhkNpU3aU",
    authDomain: "train-schedule-9ed0f.firebaseapp.com",
    databaseURL: "https://train-schedule-9ed0f.firebaseio.com",
    projectId: "train-schedule-9ed0f",
    storageBucket: "train-schedule-9ed0f.appspot.com",
    messagingSenderId: "930838280056"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

$(document).ready(function() {

    var clock = $('.flip-clock').FlipClock ({
        clockFace: 'TwentyFourHourClock'
        });

    $("#addTrainButton").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#trainNameInput").val().trim();
        var trainDest = $("#destinationInput").val().trim();
        var trainFirstTime = moment($("#firstTimeInput").val().trim(), "HH:mm").subtract(1, "years");
        var trainFreq = $("#frequencyInput").val().trim();

        console.log("First Time: " + trainFirstTime);
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFreq);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(trainFirstTime), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq; // will tell you what's left over 
        console.log(tRemainder);

        // Minutes Until Train
        var tMinutesTilTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTilTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTilTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    })
        

})