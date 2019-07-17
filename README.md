## Monitoring Cumulocity microservices using Built.io

Third-party services can be employed to monitor microservices deployed in Cumulocity IoT. One cool tool to achieve such goal is [Built.io](https://www.built.io/).

This is a small workflow to monitor the health endpoint of a microservice deployed in the Cumulocity IoT platform. If the microservice is not up and running, Built.io will notify a Slack channel (e.g. a developers channel) and create an alarm in Cumulocity.

### Prerequisites

*   Built.io credentials.
*   Slack channel to post messages to, [Slack app and OAuth token](https://slack.dev/node-slack-sdk/getting-started).
*   Cumulocity credentials, i.e. a tenant, username and password.
*   A Cumulocity microservice deployed and subscribed to the tenant.

Cumulocity microservices are server-side applications used to extend the platform with specific functionality. Developers are not restricted to any specific tech stack, however, there are certain requirements that must be met. Review the [Microservice SDK guide](https://cumulocity.com/guides/microservice-sdk/introduction/) for more details.

> **Note that trial accounts can be created for Built.io and Cumulocity.<br>Accounts for students are also available.**

### Setup

On the Built.io dashboard, create a blank workflow and follow the steps below to configure it.<br>
Make sure to save the workflow when changes are made on the actions or parameters.

Initially, the workflow will contain the **Trigger** (left side) and the **Completion** (right side) actions.

![blank-workflow](/img/blank-workflow.png)

#### 1. Define the environment parameters

Before adding actions to the workflow, the environment parameters shall be specified. Open the **Workflow settings** and add the following parameters (key/value pairs):

*   username, password - Cumulocity credentials
*   server - Cumulocity tenant domain (URL)
*   microservice - Name of the microservice to monitor
*   trackerId - The ID of a managed object (e.g. 1234)

These parameters will be used to configure the different actions in the workflow.

![workflow-parameters](/img/workflow-parameters.png)

#### 2. Check the /health endpoint

The first action will verify if a microservice is up and running. On the workflow dashboard's right side, search for the **Node.js Code** action. Drag the action to the dashboard and connect it to the trigger.

Mouse-hovering an action displays the available options, i.e. settings, copy/delete action. Double click will open the settings of the action.

Open the settings of the **Node.js Code** action and give it a label, e.g. *GET /microservice/health*.
It is not required to know JavaScript, but basic knowledge would be useful.

On the code input, the action has to make a GET request on the health endpoint of the microservice and it requires basic authorization. The response will return a JSON object with the property `"status" : "UP"` if the microservice is up and running. Export this status to be available after the action is completed, so the next action will take it as its input.

The code for this action can be found on the [checkHealth.js](src/checkHealth.js) file.

#### 3. Notify a Slack channel



#### 4. Create an alarm

with the c8y action or node.js

#### 5. Repeat


### Execution

Turn it on.
