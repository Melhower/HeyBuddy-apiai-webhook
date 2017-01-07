'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let config = require("./config");


const restService = express();
restService.use(bodyParser.json());


var thisSessionId;

restService.post('/hook', function (req, res) {

    console.log('hook request');

    console.log("request: "+JSON.stringify(req.body));

    try {
        var speech = 'empty speech';
        var data = 'empty data';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';
                data = {};

                if (requestBody.sessionId) {
                    thisSessionId = requestBody.sessionId;
                }

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action === "generateWorkout") {
                    let generateWorkout = generateWorkout(parsDuration(requestBody.result.parameters.duration), parsLocation(requestBody.result.parameters.location));
                    if (generateWorkout)
                    data = {
                        distributor: generateWorkout.messages,
                    };

                }

                else if (requestBody.result.action) 
                    speech += 'action: ' + requestBody.result.action;
                

            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            data: data,
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


function parsDuration(duration){
    console.log("duration: "+JSON.stringify(duration));
    if (duration == "") { return 30}
        else
            return duration.amount <= 60? duration.amount : 60;
    }

    function parsLocation(location){
        console.log("location: "+JSON.stringify(location));

        if (location == "" || location.includes("work")) {
            return "home";
        }
        else return location;
    }


    function generateWorkout(duration, location) {
        return config.filter((workout) => isInLocation(workout, location))
            .filter((workout) => isInDuration(workout, duration));
    }

function isInLocation(workout, location) {
    return workout.locations.includes(location);
    }

function isInDuration(workout, duration) {
    return duration - workout.duration >= 0 && duration - workout.duration < 5;
    }

