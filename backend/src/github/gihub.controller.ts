import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitCommit } from './github.interfaces';

@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('owners/:owner/repos/:repo')
  async findAllCommits(
    @Param('owner') owner: string,
    @Param('repo') repo: string,
  ): Promise<GitCommit[]> {
    return await this.githubService.fetchCommitHistory(owner, repo);
  }
}
