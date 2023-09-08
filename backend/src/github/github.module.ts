import { Module } from '@nestjs/common';
import { GithubService } from './github.service';

@Module({
  controllers: [],
  providers: [GithubService],
})
export class GithubModule {}
