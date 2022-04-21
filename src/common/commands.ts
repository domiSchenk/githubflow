import { quiet, $ } from "zx";
import { Branch } from "./branch";

export async function getCurrentBranch(): Promise<Branch> {
    let branch = await quiet($`git branch --show-current`);
    const name = branch.stdout.replace(/\n/, '');
    return new Branch(name);
}


export async function createBranch(branch: Branch) {
    console.log(`- Creating new branch: ${branch.coloredName}`);
    await quiet($`git checkout -b ${branch.name}`);
}

export async function switchToBranch(branch: Branch) {
    console.log(`- Switching to branch ${branch.coloredName} `);
    await quiet($`git checkout ${branch.name}`);
}

export async function deleteBranch(branch: Branch) {
    console.log(`- Deleting branch ${branch.coloredName}`);
    await quiet($`git branch -D ${branch.name}`);
}

export async function deleteRemoteBranch(branch: Branch) {
    await quiet($`git push origin --delete ${branch.name}`);
}

export async function checkRepoStatus() {
    let status = await quiet($`git status`);
    return status.stdout;
}

export async function hasRepoChanges() {
    let status = await checkRepoStatus();
    return status.indexOf('nothing to commit') < 0;
}

export async function commit(message: any) {
    await quiet($`git add .`);
    await quiet($`git commit -am "${message}"`);
}


export async function getBranches() {
    let branches = await quiet($`git branch`);
    return branches.stdout.split('\n')
        .filter(b => b.length > 0)
        .map(b => b.replace('*', ''))
        .map(b => b.trim());
}


export async function mergeBranch(from: Branch, to: Branch) {
    console.log(`- Merge branch ${from.coloredName} into ${to.coloredName}`);
    await quiet($`git merge ${from.name}`);
}

export async function getReleaseBranchs() {
    let branches = await getBranches();
    return branches.filter(b => b.startsWith('release/'));
}
