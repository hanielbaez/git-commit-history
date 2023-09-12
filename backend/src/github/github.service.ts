import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';

import { GitCommitDto } from './dtos/git-commit.dto';
import { CommitSHADto } from './dtos/commit-sha.dto';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class GithubService {
  constructor(private readonly axiosService: AxiosService) {}

  async fetchCommitHistory(
    owner: string,
    repository: string,
  ): Promise<GitCommitDto[]> {
    try {
      const response = await this.axiosService.axiosConfig.get(
        `repos/${owner}/${repository}/commits`,
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === HttpStatusCode.NotFound) {
        throw new NotFoundException(
          `No commits found for user ${owner}'s repository ${repository}. Please check the repository name and try again.`,
        );
      } else if (error.response?.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedException(
          'It looks like you are using a wrong Github token, please verify it and try again',
          error,
        );
      } else if (error.response?.status === HttpStatus.FORBIDDEN) {
        throw new ForbiddenException(error.response?.data, error);
      }
      throw new HttpException(
        'Failed to fetch commit history from GitHub API',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async fetchCommitPatch(
    owner: string,
    repository: string,
    sha: string,
  ): Promise<CommitSHADto | null> {
    try {
      const response = await this.axiosService.axiosConfig.get(
        `repos/${owner}/${repository}/commits/${sha}`,
      );

      return { patch: response.data.files[0]?.patch };
    } catch (error) {
      if (error.response?.status === HttpStatusCode.NotFound) {
        throw new NotFoundException(
          `No commits found for user ${owner}'s repository ${repository}. Please check the repository name and try again.`,
        );
      }
      throw new HttpException(
        "Failed to fetch commit's pathc from GitHub API",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
