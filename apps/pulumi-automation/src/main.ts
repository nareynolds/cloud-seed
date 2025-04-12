console.log('Hello World');

import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';
// import * as upath from "upath";

import process from 'process';

const args = process.argv.slice(2);
let destroy = false;
if (args.length > 0 && args[0]) {
  destroy = args[0] === 'destroy';
}

async function main() {
  // Create our stack using a local program
  // in the ../website directory
  const args: LocalProgramArgs = {
    stackName: 'dev',
    workDir: '/Users/nathanielreynolds/code/cloud-seed/apps/bootstrap',
  };

  // create (or select if one already exists) a stack that uses our local program
  const stack = await LocalWorkspace.createOrSelectStack(args);

  console.info('successfully initialized stack');
  //   console.info('setting up config');
  //   await stack.setConfig('aws:region', { value: 'us-east-1' });
  //   console.info('config set');
  console.info('refreshing stack...');
  await stack.refresh({ onOutput: console.info });
  console.info('refresh complete');

  if (destroy) {
    console.info('destroying stack...');
    await stack.destroy({ onOutput: console.info });
    console.info('stack destroy complete');
    process.exit(0);
  }

  console.info('updating stack...');
  const upRes = await stack.up({ onOutput: console.info });
  console.log(
    `update summary: \n${JSON.stringify(
      upRes.summary.resourceChanges,
      null,
      4
    )}`
  );
  // console.log(`website url: ${upRes.outputs.websiteUrl.value}`);
}

void main();
