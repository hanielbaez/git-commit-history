import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './gihub.controller';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
