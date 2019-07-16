const request = require("request");

// Cumulocity credentials
const credentials = $config.params.username + ":" + $config.params.password;

// Cumulocity microservice health endpoint (URL)
const ms_endpoint = $config.params.tenantDomain + "/service/" + $config.params.microservice + "/health";

// Basic authorization
const options = {
    "url" : ms_endpoint,
    "headers" : {
      "Authorization" : "Basic " + Buffer.from(credentials).toString("base64"),
      "Accept" : "application/json"
    }
};

// GET request to the microservice health endpoint
request(options, function (error, response, body) {

    let status = JSON.parse(body).status;

    // Export the health status of the microservice
    if (status === undefined || status !== "UP") {
        $export(null, { microservice : $config.params.microservice, healthy : false });
    }
    else {
        $export(null, { microservice : $config.params.microservice, healthy : true });
    }

});
