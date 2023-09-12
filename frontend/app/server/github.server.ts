import type { z } from "zod";

import { CommitListSchema, type CommitSchema } from "../schema/commit.schema";
import extractUserInfoFromGitHubUrl from "./extract-user-info-from-github-url.server";

const BASE_URL = process.env.API ?? "http://localhost:3000";

export type Commit = z.infer<typeof CommitSchema>;
export type CommitList = z.infer<typeof CommitListSchema>;

export const fetchCommits = async (
  searchQuery: string
): Promise<{ commits: CommitList; statusCode: number }> => {
  const userInfo = extractUserInfoFromGitHubUrl(searchQuery);

  if (!userInfo?.username || !userInfo?.repository) {
    console.error("Invalid username or repository");
    return { commits: [], statusCode: 400 };
  }

  const url = new URL(
    `${BASE_URL}/github/owners/${userInfo.username}/repos/${userInfo.repository}`
  );

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log(
        `Request failed with status: ${response.status} and body: ${response.body}`
      );
      return { commits: [], statusCode: response.status };
    }

    const json = await response.json();
    return { commits: CommitListSchema.parse(json), statusCode: 200 };
  } catch (error) {
    console.error("Error fetching commits", error);
    return { commits: [], statusCode: 500 };
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
    `${BASE_URL}/github/owners/${userInfo.username}/repos/${userInfo.repository}/commits/${sha}`
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
