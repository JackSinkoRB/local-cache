import * as core from '@actions/core'
import saveImpl from './saveImpl'
import { StateProvider } from './stateProvider'
import {Inputs} from "./constants";

async function run(): Promise<void> {
  await saveImpl(new StateProvider())

    try {
        // Run the Linux command after saveImpl
        const { stdout, stderr } = await execAsync(`rm -rf ${Inputs.Path}`);

        // Handle the output if needed
        console.log('Command Output:', stdout);
        console.error('Command Error:', stderr);
    } catch (error) {
        // Handle errors if the command fails
        console.error('Error running command:', error);
    }
}

run()
  .catch((error: unknown) => {
    core.setFailed((error as Error).message)
  })

export default run
