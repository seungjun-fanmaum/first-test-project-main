import { IsNumber } from 'class-validator';
import { CreatePostDto } from './createPostDto';
import { Type } from 'class-transformer';
import { PostDto } from './postDto';

export class PostAndCountDto {
  @Type(() => PostDto)
  postDto: PostDto;

  @IsNumber()
  pageCount: number;
}
