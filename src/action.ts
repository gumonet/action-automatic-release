import * as core from '@actions/core';
import { Context } from '@actions/github/lib/context';

import {
  dumpGitHubEventPayload,
  getAndValidateArgs,
  parseGitTag,
} from './utils';

export const main = async () => {
  const args = getAndValidateArgs();
  const context = new Context();
  core.startGroup('Initializing the Automatic Releases action');
  dumpGitHubEventPayload();
  core.debug(`Github context: ${JSON.stringify(context)}`);
  core.endGroup();
  core.startGroup('Determining release tags');
  const releaseTag = args.automaticReleaseTag
    ? args.automaticReleaseTag
    : parseGitTag(context.ref);
  if (!releaseTag) {
    throw new Error(
      `The parameter "automatic_release_tag" was not set and this does not appear to be a GitHub tag event. (Event: ${context.ref})`,
    );
  }
};
