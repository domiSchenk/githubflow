# Github like flow in a cli

```
Usage: ghflow [options] [command]

Basic Github-flow CLI

Options:
  -V, --version   output the version number
  -h, --help      display help for command


Commands:
  feature [name]
  hotfix [name]
  release [name]
  finish
  help [command]  display help for command
```

## Installation

```
npm i -g githubflow --registry=https://npm.softec.ch
```

## Examples
Start a feature:
```
ghflow feature my-feature
or
ghflow feature
```

### Finish

This command will finish the current feature, hotfix or release branch. No need to specify the branch name.


## UNABLE_TO_VERIFY_LEAF_SIG

If you are getting this error, you can try to run the following command:

```
run npm config set strict-ssl false
```
