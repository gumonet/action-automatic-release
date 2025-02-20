import { Args } from './interfaces';
import * as core from '@actions/core';
import * as fs from 'fs';

export const getAndValidateArgs = (): Args => {
  const args = {
    repoToken: core.getInput('repo_token', { required: true }),
    automaticReleaseTag: core.getInput('automatic_release_tag', {
      required: false,
    }),
    preRelease: JSON.parse(core.getInput('prerelease', { required: true })),
    releaseTitle: core.getInput('title', { required: false }),
    files: [] as string[],
  };

  const inputFilesStr = core.getInput('files', { required: false });
  if (inputFilesStr) {
    args.files = inputFilesStr.split(/\r?\n/);
  }

  return args;
};

export const dumpGitHubEventPayload = (): void => {
  // eslint-disable-next-line no-undef
  const ghpath: string = process.env['GITHUB_EVENT_PATH'] || '';
  if (!ghpath) {
    throw new Error(
      'Environment variable GITHUB_EVENT_PATH does not appear to be set.',
    );
  }
  const contents = fs.readFileSync(ghpath, 'utf8');
  const jsonContent = JSON.parse(contents);
  core.info(`GitHub payload: ${JSON.stringify(jsonContent)}`);
};

export const parseGitTag = (inputRef: string): string => {
  const re = /^(refs\/)?tags\/(.*)$/;
  const resMatch = inputRef.match(re);
  if (!resMatch || !resMatch[2]) {
    core.debug(`Input "${inputRef}" does not appear to be a tag`);
    return '';
  }
  return resMatch[2];
};
