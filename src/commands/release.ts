#!/usr/bin/env zx
import { bold, green, red } from 'chalk';
import { $ } from 'zx';
import { Branch } from '../common/branch';
import { getCurrentBranch } from '../common/commands';
import { askForBranchName, checkHasChanges, createNewBranch } from '../common/helpers';
$.shell = 'C:/Program Files/Git/usr/bin/bash';



export async function createReleaseBranch(name: string) {
    let currentBranch = await getCurrentBranch();

    if (await checkHasChanges()) { return; }

    console.log(`Current Branch: ${currentBranch.coloredName}`);

    if (!currentBranch.isMain) {
        console.log(red(`You are currently not on the ${bold('Main')} branch.`));
        console.log(red(`Please switch to the ${bold('Main')} branch before creating a release branch.`));
        return;
    }

    let newBranch = name;
    if (!newBranch || newBranch.length === 0) {
        newBranch = await askForBranchName('release');
    }

    const branchName = `release/${newBranch}`;
    const branch = new Branch(branchName);

    console.log(`Creating new ${green('release')} branch: ${branch.coloredName}`);

    createNewBranch(branch);
}
