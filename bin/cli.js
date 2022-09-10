#!/usr/bin/env node

// Credit: https://bonsaiilabs.com/create-npx-starter-command/

const { execSync } = require("child_process");

function runCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`);
    return false;
  }

  return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/jsjoeio/create-express-ts ${repoName}`;
const installDepsCommand = `cd ${repoName} && yarn install`;
const cleanupCommand = `cd ${repoName} && rm -rf ./bin && rm -rf .git`;

console.log(`Cloning the create-express-ts with name ${repoName}`);

const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) {
  process.exit(1);
}

const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) {
  process.exit(1);
}

const cleanedUp = runCommand(cleanupCommand);

if (!cleanedUp) {
  process.exit(1);
}

console.log(`\n🎉 Your repo is ready!`);
console.log(`➡️ 'cd ${repoName} && yarn dev' to start your app`);
