import { IsNotEmpty, IsString } from 'class-validator';

export class FindAllCommitsDto {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  repository: string;
}

export class GetFirstCommitsSHADto extends FindAllCommitsDto {
  @IsNotEmpty()
  @IsString()
  sha: string;
}
