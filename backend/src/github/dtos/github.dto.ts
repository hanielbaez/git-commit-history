class CommitAuthorDto {
  name: string;
  email: string;
  date: string;
}

class CommitterDto {
  login: string;
  id: number;
}

class CommitTreeDto {
  sha: string;
  url: string;
}

class CommitVerificationDto {
  verified: boolean;
  reason: string;
}

class CommitDto {
  author: CommitAuthorDto;
  committer: CommitterDto;
  message: string;
  tree: CommitTreeDto;
  url: string;
  comment_count: number;
  verification: CommitVerificationDto;
}

class ParentDto {
  sha: string;
  url: string;
  html_url: string;
}

class GitCommitDto {
  sha: string;
  node_id: string;
  commit: CommitDto;
  url: string;
  html_url: string;
  comments_url: string;
  author: CommitterDto;
  committer: CommitterDto;
  parents: ParentDto[];
}

export { GitCommitDto };
