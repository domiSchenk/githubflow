#!/usr/bin/env zx
import { blue, bold, green, red, yellow } from 'chalk';
import { $ } from 'zx';
import { Branch } from '../common/branch';
import { getCurrentBranch } from '../common/commands';
import { askForBranchName, checkHasChanges, createNewBranch } from '../common/helpers';

$.shell = 'C:/Program Files/Git/usr/bin/bash';


export async function createFeatureBranch(name: string) {
    let currentBranch = await getCurrentBranch();

    if (await checkHasChanges()) { return; }

    console.log(`Current Branch: ${currentBranch.coloredName}`);

    if (currentBranch.isRelease) {
        console.log(red(`You are currently on a ${bold('release')} branch.`));
        console.log(red(`Please switch to the ${bold('Main')} branch before creating a feature branch.`));
        return;
    }

    if (currentBranch.isFeature) {
        console.log(blue(`You are currently on a feature branch.`));
        console.log(green(`Do you want to create a new feature branch?`));
        console.log('todo!');
        return;
    }


    let newBranch = name;
    if (!newBranch || newBranch.length === 0) {
        newBranch = await askForBranchName('feature');
    }

    const branchName = `feature/${newBranch}`;
    const branch = new Branch(branchName);

    console.log(`Creating new ${yellow('feature')} branch: ${branch.coloredName}`);

    createNewBranch(branch);
}
