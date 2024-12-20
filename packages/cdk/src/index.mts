import 'source-map-support/register'
import { App, Stack, Stage, Tags } from "aws-cdk-lib"
import rootPackage from '../../../package.json' assert { type: 'json' }

const app = new App()

// EDIT: This is a placeholder for each of the stages to define
const stages = [
  'Dev',
  'Prod',
]

stages
  .map((stageName) => new Stage(app, stageName))
  .forEach((stage) => {
    const stacks = [
      // EDIT: This is a placeholder for each of the stacks to define
      new Stack(stage, rootPackage.name)
    ]

    // Tags for each stack for cost allocation purposes
    // NB: These need to be activated in Billing & Cost Management > Cost Allocation Tags after the stacks
    // have been created and Billing has had a chance to process the tags (up to 24 hours)
    stacks.forEach((stack) => {
      Tags.of(stack).add('user:package', rootPackage.name)
      Tags.of(stack).add('user:stage', stage.stageName)
      Tags.of(stack).add('user:stack', stack.stackName)

      // EDIT: Any additional tags
    })
  })

