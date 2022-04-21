#!/usr/bin/env node

import { red } from 'chalk';
import { Command } from 'commander';
import { createFeatureBranch } from './commands/feature';
import { doFinish } from './commands/finish';
import { createHotfixBranch } from './commands/hotfix';
import { createReleaseBranch } from './commands/release';
import { status } from './commands/status';

const cliName = 'ghflow';
const description = 'Basic Github-flow CLI';
const version = '0.1.0';

// console.log(red(figlet.textSync(`Github flow-cli v${version}`, { horizontalLayout: 'full' })));
console.log(red(`Github flow-cli v${version}`));
console.log();

const program = new Command();

program.name(cliName).description(description).version(version);

program.command('feature [name]').action(async (name) => {
    await createFeatureBranch(name);
});

program.command('hotfix [name]').action(async (name) => {
    await createHotfixBranch(name);
});
program.command('release [name]').action(async (name) => {
    await createReleaseBranch(name);
});

program.command('finish').action(async () => {
    await doFinish();
});

program.command('status').action(() => {
    status();
});

program.command('init').action(() => {
    console.log('yes init!');
});


program.parse(process.argv);
