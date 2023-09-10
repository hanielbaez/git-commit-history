import { z } from "zod";

export const CommitSchema = z.object({
  sha: z.string(),
  node_id: z.string(),
  commit: z.object({
    author: z.object({
      name: z.string(),
      email: z.string().email(),
      date: z.string().datetime(),
    }),
    message: z.string(),
    url: z.string().url(),
    comment_count: z.number(),
  }),
  html_url: z.string().url(),
  comments_url: z.string().url(),
  committer: z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    avatar_url: z.string().url(),
    gravatar_id: z.string(),
    url: z.string().url(),
    html_url: z.string().url(),
    followers_url: z.string().url(),
    following_url: z.string().url(),
    gists_url: z.string().url(),
    starred_url: z.string().url(),
    subscriptions_url: z.string().url(),
    organizations_url: z.string().url(),
    repos_url: z.string().url(),
    events_url: z.string().url(),
    received_events_url: z.string().url(),
    type: z.string(),
    site_admin: z.boolean(),
  }),
});

export const CommitListSchema = z.array(CommitSchema);
