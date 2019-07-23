const request = require("request");

// Cumulocity credentials
const credentials = $config.params.username + ":" + $config.params.password;

// Basic authorization and alarm details
const options = {
    "url" : $config.params.server + "/alarm/alarms",
    "headers" : {
      "Authorization" : "Basic " + Buffer.from(credentials).toString("base64"),
      "Accept" : "application/json"
    },
    "json" : {
        "source": {
            "id": $config.params.trackerId
        },
        "type": "c8y_Application__Microservice_unhealthy",
        "text": "The microservice " + $config.params.microservice + " is not UP and running",
        "severity": "MINOR",
        "status": "ACTIVE",
        "time": new Date(Date.now()).toISOString()
    }
};

// Create the alarm
request.post(options, function (error, response, body) {
    if (body.id !== undefined) {
        $export(null, { "alarmId" : body.id });
    }
});
