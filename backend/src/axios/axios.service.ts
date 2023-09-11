import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export const GITHUB_API_BASE_URL = 'https://api.github.com/';

@Injectable()
export class AxiosService {
  public readonly axiosConfig;
  private githubToken = this.configurationService.get<string>('GITHUB_TOKEN');

  constructor(private readonly configurationService: ConfigService) {
    if (!this.githubToken) {
      console.warn('GITHUB_TOKEN is not set in the environment.');
    }

    this.axiosConfig = axios.create({
      baseURL: GITHUB_API_BASE_URL,
      timeout: 1000,
      ...(this.githubToken
        ? {
            headers: {
              Authorization: 'Bearer ' + this.githubToken,
            },
          }
        : {}),
    });
  }
}
