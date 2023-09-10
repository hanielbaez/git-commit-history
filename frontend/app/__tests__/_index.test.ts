import { Request } from "@remix-run/node";
import { loader, action } from "../routes/_index";

import * as githubServer from "../server/github.server";

describe("Loader Function", () => {
  const mockCommit = {
    sha: "90c6f2539661003d383dad0e22949f8a65551597",
    node_id:
      "C_kwDOKRG__doAKDkwYzZmMjUzOTY2MTAwM2QzODNkYWQwZTIyOTQ5ZjhhNjU1NTE1OTc",
    commit: {
      author: {
        name: "NoobBaez",
        email: "haniel_0101@hotmail.com",
        date: "2023-09-10T20:17:22Z",
      },
      message: "Add test for fetchCommitPatch",
      url: "https://api.github.com/repos/hanielbaez/git-commit-history/git/commits/90c6f2539661003d383dad0e22949f8a65551597",
      comment_count: 0,
    },
    html_url:
      "https://github.com/hanielbaez/git-commit-history/commit/90c6f2539661003d383dad0e22949f8a65551597",
    comments_url:
      "https://api.github.com/repos/hanielbaez/git-commit-history/commits/90c6f2539661003d383dad0e22949f8a65551597/comments",
    committer: {
      login: "hanielbaez",
      id: 23202818,
      node_id: "MDQ6VXNlcjIzMjAyODE4",
      avatar_url: "https://avatars.githubusercontent.com/u/23202818?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/hanielbaez",
      html_url: "https://github.com/hanielbaez",
      followers_url: "https://api.github.com/users/hanielbaez/followers",
      following_url:
        "https://api.github.com/users/hanielbaez/following{/other_user}",
      gists_url: "https://api.github.com/users/hanielbaez/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/hanielbaez/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/hanielbaez/subscriptions",
      organizations_url: "https://api.github.com/users/hanielbaez/orgs",
      repos_url: "https://api.github.com/users/hanielbaez/repos",
      events_url: "https://api.github.com/users/hanielbaez/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/hanielbaez/received_events",
      type: "User",
      site_admin: false,
    },
  };
  const mockCodeChanged = { sha: "<p>Hola mundo</p>" };

  beforeAll(() => {
    jest.spyOn(githubServer, "fetchCommits").mockResolvedValue([mockCommit]);
    jest
      .spyOn(githubServer, "fetchCommitSHA")
      .mockResolvedValue(mockCodeChanged.sha);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return commits and codeChanged when searchQuery is provided", async () => {
    const argument = {
      request: { url: "http://haniel.com/?search=query" },
    } as any;

    const result = await loader(argument);

    expect(result).toEqual({
      codeChanged: [mockCodeChanged.sha],
      commits: [mockCommit],
    });
  });

  it("should return null commits and codeChanged when searchQuery is not provided", async () => {
    const argument = {
      request: { url: "http://haniel.com/" },
    } as any;

    const result = await loader(argument);

    expect(result).toEqual({ commits: null, codeChanged: null });
  });

  it("should handle errors and return null commits and codeChanged", async () => {
    const argument = {
      request: { url: "http://haniel.com/?search=query" },
    } as any;

    jest
      .spyOn(githubServer, "fetchCommitSHA")
      .mockRejectedValue(new Error("Oh noo!"));

    const result = await loader(argument);

    expect(result).toEqual({ commits: null, codeChanged: null });
  });
});
