'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action === "generateWorkout") {
                    speech += generateWorkout(requestBody.result.parameters.duration.amount, requestBody.result.parameters.location);
                }

                else if (requestBody.result.action) 
                    speech += 'action: ' + requestBody.result.action;
                

            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});


var duration,location;
function generateWorkout(duration, location) {
    this.duration = duration <= 60? duration : 60;
    this.location = location;

    return workouts.filter(isInLocation).filter(isInDuration).map(printWorkout).join("\n");
}

function isInLocation(workout){
    return workout.locations.includes(this.location);
}

function isInDuration(workout){
    return this.duration - workout.duration >= 0 && this.duration - workout.duration < 5;
}

function printWorkout(workout){
    return "\n " + workout.warmup.time + " mins: "+ workout.warmup.exercises.join("\n") + 
    "\n" + workout.workout.time + " mins: "+ workout.workout.exercises.join("\n");
}

const workouts = [
{
    "locations": ["home","work"],
    "duration": 15,
    "warmup":{
        "time": 5,
        "exercises": ["warmup"]
    },
    "workout": {
        "time": 10,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (with each leg)",
            "link": ""
        },
        {
            "name": "12 Air Squats",
            "link": ""
        },
        {
            "name": "9 Push-Ups",
            "link": ""
        },
        ]
    }
},
];