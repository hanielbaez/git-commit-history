import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { AxiosService, GITHUB_API_BASE_URL } from './axios.service';

describe('AxiosService', () => {
  let axiosService: AxiosService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('your_github_token_here'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AxiosService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    axiosService = module.get<AxiosService>(AxiosService);
  });

  it('should be defined', () => {
    expect(axiosService).toBeDefined();
  });

  it('should have axiosConfig defined', () => {
    expect(axiosService.axiosConfig).toBeDefined();
  });

  it('should have baseURL set to GitHub API URL', () => {
    expect(axiosService.axiosConfig.defaults.baseURL).toBe(GITHUB_API_BASE_URL);
  });

  it('should have headers with Authorization token', () => {
    const expectedToken = 'Bearer your_github_token_here';
    expect(axiosService.axiosConfig.defaults.headers.Authorization).toBe(
      expectedToken,
    );
  });

  it('should throw an error if GITHUB_TOKEN is not set', async () => {
    const mockConfigServiceWithoutToken = {
      get: jest.fn().mockReturnValue(undefined),
    };

    try {
      const module = await Test.createTestingModule({
        providers: [
          AxiosService,
          {
            provide: ConfigService,
            useValue: mockConfigServiceWithoutToken,
          },
        ],
      }).compile();

      module.get<AxiosService>(AxiosService);
    } catch (error) {
      expect(error.message).toBe('GITHUB_TOKEN is not set in the environment.');
    }
  });
});
