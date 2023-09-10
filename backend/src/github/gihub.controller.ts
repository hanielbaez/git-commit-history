import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitCommitDto } from './dtos/git-commit.dto';
import { FindAllCommitsDto, GetFirstCommitsSHADto } from './dtos/param.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommitSHADto } from './dtos/commit-sha.dto';

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

  @Get('owners/:owner/repos/:repository/commits/:sha')
  async getFirstCommitsSHA(
    @Param() { owner, repository, sha }: GetFirstCommitsSHADto,
  ): Promise<CommitSHADto> {
    return await this.githubService.fetchCommitPatch(owner, repository, sha);
  }
}
