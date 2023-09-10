import { Test, TestingModule } from '@nestjs/testing';

import { GithubService } from './github.service';
import { AxiosModule } from '../axios/axios.module';
import { AxiosService } from '../axios/axios.service';

describe('GithubService', () => {
  let githubService: GithubService;
  let axiosService: AxiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AxiosModule],
      providers: [GithubService],
    }).compile();

    githubService = module.get<GithubService>(GithubService);
    axiosService = module.get<AxiosService>(AxiosService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  describe('fetchCommitHistory', () => {
    it('should return commit history', async () => {
      const mockResponse = [{ commit: { message: 'Test commit' } }];
      jest
        .spyOn(axiosService.axiosConfig, 'get')
        .mockResolvedValue({ data: mockResponse } as any);

      const owner = 'owner';
      const repo = 'repo';
      const result = await githubService.fetchCommitHistory(owner, repo);

      expect(result).toEqual(mockResponse);

      expect(axiosService.axiosConfig.get).toHaveBeenCalledWith(
        `repos/${owner}/${repo}/commits`,
      );
    });

    it('should handle API request error', async () => {
      const errorMessage = 'API Error';
      const customError = new Error(errorMessage);
      (customError as any).response = {
        status: 500,
        data: {
          message: 'Internal Server Error',
        },
      };
      jest
        .spyOn(axiosService.axiosConfig, 'get')
        .mockRejectedValue(customError);

      const owner = 'owner';
      const repo = 'repo';

      await expect(
        githubService.fetchCommitHistory(owner, repo),
      ).rejects.toThrowError('Failed to fetch commit history from GitHub API');
    });
  });
});
