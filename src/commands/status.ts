import { checkRepoStatus } from '../common/commands';

export async function status() {
    const status = await checkRepoStatus();
    console.log(status);
}
