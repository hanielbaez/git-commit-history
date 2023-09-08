import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios, { HttpStatusCode } from 'axios';

import { GitCommit } from './github.interfaces';

const GITHUB_API_BASE_URL = 'https://api.github.com/';

@Injectable()
export class GithubService {
  async fetchCommitHistory(
    owner: string,
    repository: string,
  ): Promise<GitCommit[]> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE_URL}repos/${owner}/${repository}/commits`,
      );
      return response.data;
    } catch (error) {
      if (error.response.status === HttpStatusCode.NotFound) {
        throw new NotFoundException(
          `No commits found for user ${owner}'s repository ${repository}. Please check the repository name and try again.`,
        );
      }
      throw new HttpException(
        'Failed to fetch commit history from GitHub API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
