## Monitor Cumulocity microservices using Built.io

Third-party services can be employed to monitor Cumulocity's microservices. One cool tool to achieve such goal is Built.io.

This is a small workflow to monitor the health endpoint of a microservice deployed in the Cumulocity IoT platform. If the microservice is not up and running, Built.io will notify a Slack channel (e.g. a developers channel) and create an alarm in Cumulocity.
