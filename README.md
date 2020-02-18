## Monitoring Cumulocity IoT microservices using Built.io Flow

Third-party services can be employed to monitor microservices deployed in Cumulocity IoT. One cool tool to achieve such goal is [Built.io Flow](https://www.built.io/).

This is a small workflow to monitor the health endpoint of a microservice deployed in the Cumulocity IoT platform. If the microservice is not up and running, Built.io will notify a Slack channel and create an alarm in Cumulocity IoT.

### Prerequisites

*   Built.io credentials.
*   Slack channel to post messages to, [Slack app and OAuth token](https://slack.dev/node-slack-sdk/getting-started).
*   Cumulocity IoT credentials, i.e. a tenant, username and password.
*   A Cumulocity IoT microservice deployed and subscribed to the tenant.

Cumulocity IoT microservices are server-side applications used to extend the platform with specific functionality and developers are not restricted to any specific tech stack. However, there are certain requirements that must be met. Review the [Microservice SDK guide](https://cumulocity.com/guides/microservice-sdk/introduction/) for more details.

### Setup

On the Built.io dashboard, create a blank workflow and follow the steps below to configure it.<br>
Make sure to save the workflow when changes are made on the actions or parameters.

Initially and as seen on the following image, the workflow will contain the **Trigger** (left side) and the **Completion** (right side) actions.

![Blank workflow](/img/blank-workflow.png)

#### 1. Define the environment parameters

Before adding actions to the workflow, the environment parameters must be specified. Open the **Workflow settings** and add the following parameters (key/value pairs):

*   username, password - Cumulocity IoT credentials
*   server - Cumulocity IoT tenant domain (URL)
*   microservice - Name of the microservice to monitor
*   trackerId - The ID of a managed object (e.g. 1234)

These parameters will be used to configure the different actions in the workflow.

![Workflow parameters](/img/workflow-parameters.png)

#### 2. Check the /health endpoint

The first action will verify if a microservice is up and running. On the workflow dashboard's right side, search for the **Node.js Code** action, drag it on the canvas and connect it to the trigger.

Mouse-hovering an action displays the available options, i.e. settings, copy/delete action. Double click will open the settings of the action.

Open the settings of the **Node.js Code** action and give it a label, e.g. *GET /microservice/health*.
It is not required to know JavaScript, but basic knowledge would be useful.

On the code input, the action has to make a GET request on the health endpoint of the microservice and it requires basic authorization. The response will return a JSON object with the property `"status" : "UP"` if the microservice is up and running. Export this status to be available after the action completes, so the next action will take that status as its input. Give it a meaningful name, e.g. *healthy*.

The code for this action can be found in the [checkHealth.js](src/checkHealth.js) file.

#### 3. Notify a Slack channel

As it can be seen, many actions can be configured to achieve different goals, e.g. a Slack action can be configured to notify a channel.
Search for the **Post Message to Channel** action, drag it on the canvas and connect it to the previous action.

Clicking the connection arrows also displays the available options. Open the setting of this connection to set a condition: if the microservice is not up, execute the Slack action. To achieve this, use as input the exported status from the previous action (i.e. *healthy*).

![Condition](/img/condition.png)

When the *GET /microservice/health* action completes it exports the *healthy* status, and the next actions will be executed only if the condition is met, i.e. if the microservice is not healthy.

Configuring the **Post Message to Channel** action is straightforward and only requires authorizing Slack, specifying the channel to be notified (e.g. a developers channel in charge of maintaining the microservice) and providing the message to be posted.

![slack-config](/img/slack-config.png)

Finally, connect this action to the **Completion** action.

#### 4. Create an alarm

Different actions can be executed in parallel in the workflow. In this particular case, besides notifying a Slack channel also the Cumulocity IoT tenant will be notified with an alarm. A Cumulocity IoT alarm must be associated to a source and it requires a system ID.
Search for the **Cumulocity IoT New Alarm** action, drag it on the canvas and connect it to the previous action, i.e. *GET /microservice/health*.

Configuring the alarm action is straightforward and only requires authorizing Cumulocity IoT and specifying the details of the alarm, i.e. the ID of the managed object, a description of the alarm and its type. Cumulocity IoT is a very flexible platform and allows to define customized alarm types, e.g. *c8y_Application__Microservice_unhealthy*.

![alarm](/img/alarm.png)

As this is a parallel action to be executed together with the Slack action from the previous step, set up the condition for this action to be executed only when the microservice is not healthy.

Note that this action is for tenants in a production environment, i.e. hosted in [cumulocity.com](https://cumulocity.com/try-for-free/). For staging or test servers, it is possible to create an alarm using the [Cumulocity IoT REST interface](https://cumulocity.com/guides/microservice-sdk/rest/); in such case, a **Node.js Code** action would be required. The code for such action can be found in the [createAlarm.js](src/createAlarm.js) file.

Finally, also connect this action to the **Completion** action.

#### 5. Repeat

The workflow can be started automatically based on a certain condition. Open the settings of the **Trigger** action and search for **Clock**. Set it up to be executed every 10 minutes. Eventually, the workflow should look similar to:

![Workflow](/img/workflow.png)

### Execution

This workflow runs daily and checks every 10 minutes if a microservice is up and running. In case the microservice is temporarily down during the check, e.g. it's being restarted by the system, an alarm would be created.

Once the workflow is ready, it can also be started manually. On the top-right toolbar, turn it on and click the start button.
