interface UserInfo {
  username: string;
  repository: string;
}

/**
 * Extracts the username and repository from a GitHub URL.
 * @param {string} url - The GitHub URL.
 * @returns {UserInfo|null} An object containing the username and repository, or null if the URL is invalid.
 */
export default function extractUserInfoFromGitHubUrl(
  url: string
): UserInfo | null {
  const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)$/i;
  const matches = url.match(regex);

  if (matches && matches.length === 3) {
    const username = matches[1];
    const repository = matches[2];
    return { username, repository };
  } else {
    return null;
  }
}
