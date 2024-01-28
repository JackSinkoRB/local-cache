import * as core from '@actions/core'
import saveImpl from './saveImpl'
import { StateProvider } from './stateProvider'
import {Inputs} from "./constants";
import * as utils from "./utils/actionUtils";

async function run(): Promise<void> {
  await saveImpl(new StateProvider())

    try {
        // Run the Linux command after saveImpl
        const { stdout, stderr } = await execAsync(`rm -rf ${Inputs.Path}`);

        // Handle the output if needed
        core.info(
            `Remove library output: ${stdout}`,
        )
        core.info(
            `Remove library error: ${stderr}`,
        )
    } catch (error) {
        // Handle errors if the command fails
        utils.logWarning(`Error removing library: ${error}`)
    }
}

run()
  .catch((error: unknown) => {
    core.setFailed((error as Error).message)
  })

export default run
