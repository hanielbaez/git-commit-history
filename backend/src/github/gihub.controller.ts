import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitCommitDto } from './dtos/github.dto';
import { FindAllCommitsDto } from './github.dto';

@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('owners/:owner/repos/:repository')
  async findAllCommits(
    @Param() { owner, repository }: FindAllCommitsDto,
  ): Promise<GitCommitDto[]> {
    return await this.githubService.fetchCommitHistory(owner, repository);
  }
}
