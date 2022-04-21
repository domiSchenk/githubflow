#!/usr/bin/env zx

import { bold, red } from "chalk";
import { $ } from "zx";
import { Branch } from "../common/branch";
import { getCurrentBranch, switchToBranch } from "../common/commands";
import { askForBranchName, checkHasChanges, createNewBranch, getCurrentReleaseBranch, yesNoQuestion } from "../common/helpers";

$.shell = 'C:/Program Files/Git/usr/bin/bash';


export async function createHotfixBranch(name: string) {
    let currentBranch = await getCurrentBranch();

    if (await checkHasChanges()) { return; }

    console.log(`Current Branch: ${currentBranch.coloredName}`);

    if (!currentBranch.isRelease && !currentBranch.isHotfix) {
        console.log(red(`You are currently on ${currentBranch.coloredName} branch.`));
        console.log(red(`Please switch to a ${bold('release')} branch before creating a hotfix branch.`));
        return;
    }

    if (currentBranch.isHotfix) {
        console.log(`You are currently on a hotfix branch.`);
        const answer = await yesNoQuestion(`Do you want to create a new hotfix branch?`);
        if (answer) {
            const releaseBranch = await getCurrentReleaseBranch();
            await switchToBranch(releaseBranch);
            createHotfixBranch(name);
        }
        return;
    }

    let newBranch = name;
    if (!newBranch || newBranch.length === 0) {
        newBranch = await askForBranchName('hotfix');
    }

    const branchName = `hotfix/${newBranch}`;
    const branch = new Branch(branchName);
    console.log(`Creating new ${red('hotfix')} branch: ${branch.coloredName}`);

    createNewBranch(branch);
}

