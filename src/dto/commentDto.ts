import { IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly content: string;
}
