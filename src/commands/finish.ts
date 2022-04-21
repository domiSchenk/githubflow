#!/usr/bin/env zx

import { blue, bold, red } from "chalk";
import { $ } from 'zx';
import { Branch } from "../common/branch";
import { deleteBranch as deleteGitBranch, getCurrentBranch, hasRepoChanges, mergeBranch, switchToBranch } from "../common/commands";
import { getCurrentReleaseBranch, yesNoQuestion } from "../common/helpers";

$.shell = 'C:/Program Files/Git/usr/bin/bash';


async function finish(toBranch: Branch, currentBranch: Branch, deleteBranch: boolean) {

    await switchToBranch(toBranch);

    try {
        await mergeBranch(currentBranch, toBranch);
    }
    catch (err: any) {
        if (err.stdout.indexOf('conflict') >= 0) {
            console.log(red(`There are conflicts in the merge. Please resolve them before finishing.`));
        }
        return false;
    }

    if (deleteBranch) {
        await deleteGitBranch(currentBranch);
    }

    return true;
}

export async function doFinish() {

    if (await hasRepoChanges()) {
        console.log(red('You have uncommitted changes. Please commit or stash them before finishing.'));
        return
    }

    const currentBranch = await getCurrentBranch();
    const mainBranch = new Branch('Main');

    if (currentBranch.isHotfix) {
        const releaseBranch = await getCurrentReleaseBranch();
        if (
            !(await finish(releaseBranch, currentBranch, false)) ||
            !(await finish(mainBranch, currentBranch, true))
        ) {
            console.log(`\n\nCould not finish hotfix ${currentBranch.coloredName}.`);
            console.log(`After fixing the conflicts, run: ${blue('git checkout')} ${currentBranch}`);
            console.log(`then run ${blue('ghflow finish')} again.\n\n`);
            return;
        }
        await switchToBranch(releaseBranch);
    }
    else if (currentBranch.isFeature) {
        await finish(mainBranch, currentBranch, true);
    }
    else if (currentBranch.isRelease) {
        console.log(red(`Caution: You are finishing a ${bold('release')} branch!`));

        if (await yesNoQuestion('Do you want to finish this release branch? ')) {
            await finish(mainBranch, currentBranch, true);
        }
    }
    else {
        console.log(red(`The branch "${currentBranch}" can not be finished`));
    }

}

