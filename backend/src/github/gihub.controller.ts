import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitCommit } from './github.interfaces';
import { FindAllCommitsDto } from './github.dto';

@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('owners/:owner/repos/:repository')
  async findAllCommits(
    @Param() { owner, repository }: FindAllCommitsDto,
  ): Promise<GitCommit[]> {
    return await this.githubService.fetchCommitHistory(owner, repository);
  }
}
