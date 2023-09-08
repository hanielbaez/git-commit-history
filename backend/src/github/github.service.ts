import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com/';

@Injectable()
export class GithubService {
  async fetchCommitHistory(owner: string, repo: string) {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE_URL}repos/${owner}/${repo}/commits`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch commit history from GitHub API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
