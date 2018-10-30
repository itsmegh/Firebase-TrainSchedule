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


$(document).ready(function() {

    var clock = $('.flip-clock').FlipClock ({
        clockFace: 'TwentyFourHourClock'
        });
        

})