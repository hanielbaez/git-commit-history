import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitCommitDto } from './dtos/github.dto';
import { FindAllCommitsDto } from './dtos/param.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('github')
@ApiTags('Github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('owners/:owner/repos/:repository')
  async findAllCommits(
    @Param() { owner, repository }: FindAllCommitsDto,
  ): Promise<GitCommitDto[]> {
    return await this.githubService.fetchCommitHistory(owner, repository);
  }
}
