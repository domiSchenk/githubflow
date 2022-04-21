import { blue, red } from 'chalk';
import { question } from 'zx';
import { ask } from './ask';
import { Branch } from './branch';
import { createBranch, getBranches, getReleaseBranchs, hasRepoChanges } from './commands';


export async function yesNoQuestion(query: string) {
    let answer = await question(`${query} (y/n) `);
    return answer.toLowerCase() === 'y';
}

export async function looksGood() {
    return yesNoQuestion(`Does everything look good?`);
}

export async function askForBanch() {
    const branches = await getBranches();
    let branch = await ask('Which branch do you want to delete to (use double tab)? ', {
        choices: branches,
        matching: branches,
    });
    return branch;
}

export async function askForBranchName(type: string) {
    let branch = await question(`Enter the name of the ${type} branch: `);
    branch = branch.replace(' ', '-');
    return branch;
}

export async function getCurrentReleaseBranch(): Promise<Branch> {
    const branches = await getReleaseBranchs();
    let releaseBranch = branches[0];

    if (branches.length > 1) {
        console.log(blue(`You have multiple release branches.`));
        releaseBranch = await ask('Please select the current release branch (use double tab): ', {
            choices: branches,
            matching: branches,
        });
    }
    const branch = new Branch(releaseBranch);
    return branch;
}

export async function checkHasChanges() {
    const hasChanges = await hasRepoChanges();

    if (hasChanges) {
        console.log(red(`You have uncommitted changes.`));
        console.log(red(`Please commit or stash your changes before creating a new feature branch.`));
        return true;
    }
    return false;
}

export async function createNewBranch(branch: Branch) {
    if (await looksGood()) {
        try {
            await createBranch(branch);
        } catch (err: any) {
            if (err.stdout.indexOf('already exists') >= 0) {
                console.log(red(`Branch ${red(branch.name)} already exists.`));
            } else {
                console.log(red(`Failed to create new branch: ${red(branch.name)}`));
            }
        }
    }
}
