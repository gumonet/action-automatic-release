import semverValid from 'semver/functions/valid';
import semverRcompare from 'semver/functions/rcompare';
import semverLt from 'semver/functions/lt';
import * as core from '@actions/core';
import * as Octokit from '@octokit/rest';

export const searchForPreviousReleaseTag = async (
  octokit: Octokit.Octokit,
  currentReleaseTag: string,
  owner: string,
  repo: string,
): Promise<string> => {
  const validSemver = semverValid(currentReleaseTag);
  if (!validSemver) {
    throw new Error(
      `The parameter "automatic_release_tag" was not set and the current tag "${currentReleaseTag}" does not appear to conform to semantic versioning.`,
    );
  }

  const listTagsOptions = octokit.repos.listTags.endpoint.merge({
    owner: owner,
    repo: repo,
  });
  const tl = await octokit.paginate(listTagsOptions);

  const tagList = tl
    .map((tag: any) => {
      core.debug(`Currently processing tag ${tag.name}`);
      const t = semverValid(tag.name);
      return {
        ...tag,
        semverTag: t,
      };
    })
    .filter((tag) => tag.semverTag !== null)
    .sort((a, b) => semverRcompare(a.semverTag, b.semverTag));

  let previousReleaseTag = '';
  for (const tag of tagList) {
    if (semverLt(tag.semverTag, currentReleaseTag)) {
      previousReleaseTag = tag.name;
      break;
    }
  }

  return previousReleaseTag;
};
