import {
  IsIn,
  IsNumber,
  IsNumberString,
  IsString,
  isNumber,
} from 'class-validator';

export class PostDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
