import * as core from '@actions/core';

export const runAction = async () => {
  try {
    const name = core.getInput('name');
    const message = `Hola, ${name}! Bienvenido a GitHub Actions 🚀`;
    core.setOutput('message', message);
    console.log(message);
  } catch (error) {
    core.setFailed(`Error ejecutando la Action: ${(error as Error).message}`);
  }
};
