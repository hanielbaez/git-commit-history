import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import axios from 'axios';

describe('GithubService', () => {
  let githubService: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService],
    }).compile();

    githubService = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  describe('fetchCommitHistory', () => {
    it('should return commit history', async () => {
      const mockResponse = [{ commit: { message: 'Test commit' } }];
      jest.spyOn(axios, 'get').mockResolvedValue({ data: mockResponse } as any);

      const owner = 'owner';
      const repo = 'repo';
      const result = await githubService.fetchCommitHistory(owner, repo);

      expect(result).toEqual(mockResponse);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
      );
    });

    it('should handle API request error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('API Error'));

      const owner = 'owner';
      const repo = 'repo';

      await expect(
        githubService.fetchCommitHistory(owner, repo),
      ).rejects.toThrowError('Failed to fetch commit history from GitHub API');
    });
  });
});
