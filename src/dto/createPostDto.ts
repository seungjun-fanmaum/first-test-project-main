import {
  IsIn,
  IsNumber,
  IsNumberString,
  IsString,
  isNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
