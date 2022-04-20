#!/usr/bin/env node

import { red } from 'chalk';
import clear from 'clear';
// import figlet from 'figlet';
import path from 'path';
import { Command } from 'commander';
import { status } from './commands/status';

const cliName = 'ghflow';
const description = 'Basic Github-flow CLI';
const version = '0.1.0';

// console.log(red(figlet.textSync(`Github flow-cli v${version}`, { horizontalLayout: 'full' })));
console.log(red(`Github flow-cli v${version}`));
console.log();

const program = new Command();

program.name(cliName).description(description).version(version);

program.command('feature [name]').action((name) => {
    console.log(`Feature: ${name}`);
});

program.command('hotfix [name]').action((name) => {
    console.log(`Hotfix: ${name}`);
});

program.command('finish').action(() => {
    console.log(`finish`);
});

program.command('status').action(() => {
    status();
});

program.parse(process.argv);
