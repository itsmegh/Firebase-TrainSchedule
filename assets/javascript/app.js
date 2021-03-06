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

    //flipclock functionality -- uses the extra css and js files to run
    var clock = $('.flip-clock').FlipClock ({
        clockFace: 'TwentyFourHourClock'
        });
    });

    $("#addTrainButton").on("click", function(event) {
        event.preventDefault();
        
        //tracks entries added into the form after the submit button is clicked
        var trainName = $("#trainNameInput").val().trim();
        var trainDest = $("#destinationInput").val().trim();
        var trainFirstTime = $("#firstTimeInput").val().trim();
        var trainFreq = $("#frequencyInput").val().trim();

        console.log("First Time: " + trainFirstTime);
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFreq);

        //temporary object for new train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            firstTime: trainFirstTime,
            frequency: trainFreq
        };

        //uploads train data to firebase
        database.ref().push(newTrain);

        alert("Choo Choo! Your train has been added to the schedule.");

        //clear the form
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTimeInput").val("");
        $("#frequencyInput").val("");
    });


    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
    
        //store everything in a variable
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFirstTime = childSnapshot.val().firstTime;
        var trainFreq = childSnapshot.val().frequency;

        var trainFirstTimeConverter = moment(trainFirstTime, "HH:mm").subtract(1, "years");

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
           
            setInterval(function() {
                moment((currentTime).format("hh:mm"))
            }, 60000);
        
            // Difference between the times
            var diffTime = moment().diff(moment(trainFirstTimeConverter), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);
        
            // Time apart (remainder)
            var tRemainder = diffTime % trainFreq; // will tell you what's left over 
            console.log(tRemainder);
        
            // Minutes Until Train
            var tMinutesTilTrain = trainFreq - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTilTrain);
        
            // Next Train
            var nextTrain = setInterval(function() {
                (moment().add(tMinutesTilTrain, "minutes")); console.log("tick");
            }, 60000);
            //moment().add(tMinutesTilTrain, "minutes");
            
            console.log("ARRIVAL TIME: " + moment(nextTrain).format('MMMM Do YYYY, h:mm:ss a'));
            //Formatting for next train
            var nextArrival = moment(nextTrain).format('MMMM Do YYYY, h:mm a');
    
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFreq);
        console.log(nextTrain);
        console.log(tMinutesTilTrain);

        var newRow = $("<tr>").append(
            console.log("new row getting made"),
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainFreq),
            $("<td>").text(nextArrival),
            $("<td>").text(nextTrain),
            $("<i>").addClass( "far fa-trash-alt"),

        );

        $("#train-table > tbody").append(newRow);

        //delete a train option
        $(document).on("click", ".fa-trash-alt", function(){
            $(this).parents("tr").remove();
            $(".add-new").removeAttr("disabled");
        });

    });
//});

