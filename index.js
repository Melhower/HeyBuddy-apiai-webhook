const express = require('express');
const bodyParser = require('body-parser');
let config = require("./config");


const restService = express();
restService.use(bodyParser.json());


restService.get('/ping', function (req, res) {
    res.send('pong');
});

restService.post('/hook', function (req, res) {
    function parsDuration(duration){
        console.log("duration: "+JSON.stringify(duration));
        if (duration == "")  return 30;
        else return duration.amount <= 60? duration.amount : 60;
    }

    function parsLocation(location) {
        console.log("location: "+JSON.stringify(location));
        switch (location) {
            case "home":
            case "gym":
            case "outdoor":
                return location;
            case "":
            default:
                return "home";
        }
    }

    function generateWorkout(duration, location) {
        return config.filter((workout) => isInLocation(workout, location)).filter((workout) => isInDuration(workout, duration));
    }

    function isInLocation(workout, location) {
        return workout.locations.includes(location);
    }

    function isInDuration(workout, duration) {
        return Math.floor(duration / 5) * 5 == workout.duration;
    }


    console.log('hook request');

    console.log("request: "+JSON.stringify(req.body));

    try {
        let speech = 'empty speech';
        let data = 'empty data';

        if (req.body) {
            let requestBody = req.body;

            if (requestBody.result) {
                speech = '';
                data = {};

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action === "generateWorkout") {
                    let out = generateWorkout(parsDuration(requestBody.result.parameters.duration), parsLocation(requestBody.result.parameters.location))[0];
                    if (out)
                    data = {
                        distributor: out.messages,
                    };
                }

                else if (requestBody.result.action) 
                    speech += 'action: ' + requestBody.result.action;
            }
        }

        console.log('speech: ', speech);
        console.log('data: ', data);

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
    console.log("Server listening",(process.env.PORT || 5000));
});
