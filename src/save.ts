import * as core from '@actions/core'
import saveImpl from './saveImpl'
import { StateProvider } from './stateProvider'
import {Inputs} from "./constants";
import * as utils from "./utils/actionUtils";
import { exec } from '@actions/exec';

async function run(): Promise<void> {
  await saveImpl(new StateProvider())

    core.info(
        'Removing library...',
    )
    
    await removeLibrary()
}

async function removeLibrary() {
    try {
        await exec(`rm -rf ${Inputs.Path}`);
    } catch (error) {
        core.info(
            `Remove library output: ${error}`,
        )
    }
}

run()
  .catch((error: unknown) => {
    core.setFailed((error as Error).message)
  })

export default run
