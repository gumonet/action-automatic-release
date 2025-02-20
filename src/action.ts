import * as core from '@actions/core';
import { Context } from '@actions/github/lib/context';
import { searchForPreviousReleaseTag } from './githubServices';

import {
  dumpGitHubEventPayload,
  getAndValidateArgs,
  parseGitTag,
} from './utils';
import { Octokit } from '@octokit/rest';

export const main = async () => {
  const args = getAndValidateArgs();
  const context = new Context();

  const octokit = new Octokit({ auth: args.repoToken });

  core.startGroup('Initializing the Automatic Releases action');
  dumpGitHubEventPayload();
  core.debug(`Github context: ${JSON.stringify(context)}`);
  core.endGroup();
  core.startGroup('Determining release tags');

  core.debug(`release tag searching start....`);
  /*
  const releaseTag = args.automaticReleaseTag
    ? args.automaticReleaseTag
    : parseGitTag(context.ref);
  if (!releaseTag) {
    throw new Error(
      `The parameter "automatic_release_tag" was not set and this does not appear to be a GitHub tag event. (Event: ${context.ref})`,
    );
  }*/
  /*const previousReleaseTag = args.automaticReleaseTag
    ? args.automaticReleaseTag
    : await searchForPreviousReleaseTag(
        octokit,
        releaseTag,
        context.repo.owner,
        context.repo.repo,
      );
  core.endGroup();*/
};
