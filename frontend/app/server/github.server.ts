import type { z } from "zod";

import { CommitListSchema, type CommitSchema } from "../schema/commit.schema";
import extractUserInfoFromGitHubUrl from "./extract-user-info-from-github-url.server";

export type Commit = z.infer<typeof CommitSchema>;
export type CommitList = z.infer<typeof CommitListSchema>;

export const fetchCommits = async (
  searchQuery: string
): Promise<CommitList | null | []> => {
  const userInfo = extractUserInfoFromGitHubUrl(searchQuery);

  if (!userInfo?.username || !userInfo?.repository) {
    console.error("Invalid username or repository");
    return null;
  }

  const url = new URL(
    `${process.env.API}/github/owners/${userInfo.username}/repos/${userInfo.repository}`
  );

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status: ${response.status} and body: ${response.body}`
      );
    }

    const json = await response.json();
    return CommitListSchema.parse(json);
  } catch (error) {
    console.error("Error fetching commits", error);
    return [];
  }
};

export const fetchCommitSHA = async (
  searchQuery: string,
  sha: string
): Promise<string | null> => {
  const userInfo = extractUserInfoFromGitHubUrl(searchQuery);

  if (!userInfo?.username || !userInfo?.repository || !sha) {
    console.error("Invalid username, repository or SHA");
    return null;
  }

  const url = new URL(
    `${process.env.API}/github/owners/${userInfo.username}/repos/${userInfo.repository}/commits/${sha}`
  );

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status: ${response.status} and body: ${response.body}`
      );
    }

    const { patch } = await response.json();
    return patch;
  } catch (error) {
    console.error("Error fetching commits sha", error);
    return null;
  }
};
