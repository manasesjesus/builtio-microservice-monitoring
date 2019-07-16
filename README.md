## Monitor Cumulocity microservices using Built.io

Third-party services can be employed to monitor microservices deployed in Cumulocity IoT. One cool tool to achieve such goal is [Built.io](https://www.built.io/).

This is a small workflow to monitor the health endpoint of a microservice deployed in the Cumulocity IoT platform. If the microservice is not up and running, Built.io will notify a Slack channel (e.g. a developers channel) and create an alarm in Cumulocity.

### Prerequisites

- Built.io credentials.
- Cumulocity credentials, i.e. a tenant, username and password.
- Slack channel to post messages to, [Slack app and OAuth token](https://slack.dev/node-slack-sdk/getting-started).
- A Cumulocity microservice deployed and subscribed to the tenant.

Cumulocity microservices are server-side applications used to extend the platform with specific functionality. Developers are not restricted to any specific tech stack, however, there are certain requirements that must be met. Review the [Microservice SDK guide](https://cumulocity.com/guides/microservice-sdk/introduction/) for more details.

> **Note that trial accounts can be created for Built.io and Cumulocity. Student accounts are also available.**

### Setup

There are several steps to follow to configure the workflow.

#### 1. Define the environment parameters

Before adding actions to the workflow, the environment parameters shall be specified. Open the Workflow

#### Check the /health endpoint

#### Notify a Slack channel

#### Create an alarm

with the c8y action or node.js

#### Repeat

### Execution
