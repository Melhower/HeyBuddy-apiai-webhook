'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    console.log("request: "+JSON.stringify(req.body));

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


var thisduration = 0,thislocation = "";
function generateWorkout(duration, location) {
    console.log("duration: "+JSON.stringify(duration));
    console.log("location: "+JSON.stringify(location));

    thisduration = duration <= 60? duration : 60;
    thislocation = location;

    return workouts.filter(isInLocation).filter(isInDuration).map(printWorkout).join("\n");
}

function isInLocation(workout){
    console.log("workout: "+JSON.stringify(workout));
    return workout.location == thislocation;
}

function isInDuration(workout){
    return thisduration - workout.duration >= 0 && thisduration - workout.duration < 5;
}

function printWorkout(workout){
    return "\n" + workout.warmup.time + " mins: \n"+ workout.warmup.exercises.join("\n") + 
    "\n" + workout.workout.time + " mins: \n"+ workout.workout.exercises.map(printExercise).join("\n");
}

function printExercise (exercise){
    return exercise.name + (exercise.link? "\n" + exercise.link : ""); 
}

const workouts = [

{
    "locations": "home",
    "duration": 5,
    "warmup":{
        "time": 2,
        "exercises": [
        {
            "name": "1 minute Jumping Jack”,
            "link": ""
        },
        {
            "name": "1 minute Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731538420440621/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 3,
        "exercises": [ 
        {
            "name": "5 Squats”,
            "link": ""
        },
        {
            "name": "5 Push-Ups”,
            "link": ""
        },
        {
            "name": "5 Sit-Ups”,
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 10,
    "warmup":{
        "time": 3,
        "exercises": [ 
        {
            "name": "1 minute Jumping Jack”,
            "link": ""
        },
        {
            "name": "2 minutes Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731256703802126/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 7,
        "exercises": [ 
        {
            "name": "7 Squats”,
            "link": ""
        },
        {
            "name": "7 Push-Ups",
            "link": ""
        },
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 15,
    "warmup":{
        "time": 5,
        "exercises": [ 
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "3 minutes Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731544373773359/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 10,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (per leg)",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 20,
    "warmup": {
        "time": 7,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "5 minutes Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731270500467413/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 13,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (per leg)",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 25,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 15,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (per leg)",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 30,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 20,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 35,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 25,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 40,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 45,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
        ]
    }
    "cooldown”: {
        "time": 5,
        "exercises": [ 
        {
            "name": "1 minute 30 seconds Jumping Jack",
            "link": ""
        },
        {
            "name": "1 minute 30 seconds Walking in Place",
            "link": ""
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 50,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
    }
    "cooldown”: {
        "time": 10,
        "exercises": [ 
        {
            "name": "1 minute 30 seconds Jumping Jack",
            "link": ""
        },
        {
            "name": "1 minute 30 seconds Walking in Place",
            "link": ""
        },
        {
            "name": "Cool Down Stretch",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731270500467413/?type=3&theater"
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 55,
    "warmup":{
        "time": 13,
        "exercises": [
        {
            "name": "1 minute Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
            "name": "1 minute Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
    }
    "cooldown”: {
        "time": 12,
        "exercises": [ 
        {
            "name": "1 minute Jumping Jack",
            "link": ""
        },
        {
            "name": "1 minute Walking in Place",
            "link": ""
        },
        {
            "name": "1 minute Jumping Jack",
            "link": ""
        },
        {
            "name": "1 minute Walking in Place",
            "link": ""
        },
        {
            "name": "Cool Down Stretch",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731270500467413/?type=3&theater"
        },
        ]
    }
},

{
    "locations": "home",
    "duration": 60,
    "warmup":{
        "time": 15,
        "exercises": [
        {
            "name": "1 minute Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
            "name": "1 minute Jumping Jack”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
    }
    "cooldown”: {
        "time": 15,
        "exercises": [ 
        {
            "name": "1 minute Jumping Jack",
            "link": ""
        },
        {
            "name": "1 minute Walking in Place",
            "link": ""
        },
        {
            "name": "1 minute Jumping Jack",
            "link": ""
        },
        {
            "name": "1 minute Walking in Place",
            "link": ""
        },
        {
            "name": "Cool Down Stretch",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    }
},


{
    "locations": "outdoor",
    "duration": 5,
    "warmup":{
        "time": 2,
        "exercises": [
        {
            "name": "1 minute Running”,
            "link": ""
        },
        {
            "name": "1 minute Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731538420440621/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 3,
        "exercises": [ 
        {
            "name": "5 Squats”,
            "link": ""
        },
        {
            "name": "5 Push-Ups”,
            "link": ""
        },
        {
            "name": "5 Sit-Ups”,
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 10,
    "warmup":{
        "time": 3,
        "exercises": [ 
        {
            "name": "1 minute Running”,
            "link": ""
        },
        {
            "name": "2 minutes Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731256703802126/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 7,
        "exercises": [ 
        {
            "name": "7 Squats”,
            "link": ""
        },
        {
            "name": "7 Push-Ups",
            "link": ""
        },
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 15,
    "warmup":{
        "time": 5,
        "exercises": [ 
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "3 minutes Stretching",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731544373773359/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 10,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (per leg)",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 20,
    "warmup": {
        "time": 7,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "5 minutes Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731270500467413/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 13,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (per leg)",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 25,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 15,
        "exercises": [ 
        {
            "name": "15 Mountain Climbers (per leg)",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 30,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 20,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 35,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 25,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 40,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 45,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
        ]
    }
    "cooldown”: {
        "time": 5,
        "exercises": [ 
        {
            "name": "1 minute 30 seconds Running",
            "link": ""
        },
        {
            "name": "1 minute 30 seconds Walking",
            "link": ""
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 50,
    "warmup":{
        "time": 10,
        "exercises": [
        {
            "name": "2 minutes Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
    }
    "cooldown”: {
        "time": 10,
        "exercises": [ 
        {
            "name": "1 minute 30 seconds Running",
            "link": ""
        },
        {
            "name": "1 minute 30 seconds Walking",
            "link": ""
        },
        {
            "name": "Cool Down Stretch",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731270500467413/?type=3&theater"
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 55,
    "warmup":{
        "time": 13,
        "exercises": [
        {
            "name": "1 minute Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
            "name": "1 minute Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
    }
    "cooldown”: {
        "time": 12,
        "exercises": [ 
        {
            "name": "1 minute Running",
            "link": ""
        },
        {
            "name": "1 minute Walking",
            "link": ""
        },
        {
            "name": "1 minute Running",
            "link": ""
        },
        {
            "name": "1 minute Walking",
            "link": ""
        },
        {
            "name": "Cool Down Stretch",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731270500467413/?type=3&theater"
        },
        ]
    }
},

{
    "locations": "outdoor",
    "duration": 60,
    "warmup":{
        "time": 15,
        "exercises": [
        {
            "name": "1 minute Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
            "name": "1 minute Running”,
            "link": ""
        },
        {
            "name": "15 Burpees”,
            "link": ""
        },
        {
            "name": "Stretching”,
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    },
    "workout": {
        "time": 30,
        "exercises": [ 
        {
            "name": "20 Mountain Climbers (per leg)",
            "link": ""
        },
        {
            "name": "15 Dips",
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
        {
            "name": "7 Sit-Ups",
            "link": ""
        },
        {
            "name": "5 Squat Jumps",
            "link": ""
        },
        {
            "name": "3 Burpees",
            "link": ""
        },
    }
    "cooldown”: {
        "time": 15,
        "exercises": [ 
        {
            "name": "1 minute Running",
            "link": ""
        },
        {
            "name": "1 minute Walking",
            "link": ""
        },
        {
            "name": "1 minute Running",
            "link": ""
        },
        {
            "name": "1 minute Walking",
            "link": ""
        },
        {
            "name": "Cool Down Stretch",
            "link": "https://www.facebook.com/heybuddyemotion/photos/a.1731254153802381.1073741828.1726561480938315/1731508097110320/?type=3&theater"
        },
        ]
    }
},

];