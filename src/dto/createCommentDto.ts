import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly content: string;
}
