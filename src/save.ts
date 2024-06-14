import * as core from '@actions/core';
import saveImpl from './saveImpl';
import { StateProvider } from './stateProvider';
import { Inputs } from './constants';
import { exec } from '@actions/exec';
import * as utils from './utils/actionUtils';

async function run(): Promise<void> {
    try {
        await saveImpl(new StateProvider());
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

async function removeLibrary(): Promise<void> {
    try {
        core.info(`Removing folder: ${process.env.GITHUB_WORKSPACE}/Library`);
        await exec(`rm -rf ${process.env.GITHUB_WORKSPACE}/Library`);
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

// Use Promise.all to await the completion of both functions
Promise.all([run(), removeLibrary()])
    .catch((error: unknown) => {
        utils.logWarning((error as Error).message);
    });

export default run;