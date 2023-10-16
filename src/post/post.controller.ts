import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Redirect,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from '../dto/createPostDto';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../custom-exception.filter';
import { PostAndCountDto } from '../dto/postsAndCountDto';
import { PostDto } from '../dto/postDto';
import { IsIn, IsInt, IsNumber, IsPositive, isInt } from 'class-validator';

//article에 대한 crud이다.
@ApiTags('article에 대한 api')
@Controller('posts')
@UseFilters(HttpExceptionFilter)
export class PostController {
  constructor(private readonly postService: PostService) {}

  //게시글 모두 가져오기
  @Get()
  @ApiOperation({
    summary: '게시글조회',
    description: '모든 게시글을 불러옵니다.',
  })
  @ApiResponse({ status: 200, description: '조회에 성공하였습니다' })
  getPosts(
    @Query('pageNumber', new ParseIntPipe())
    pageNumber: number,
  ): PostAndCountDto {
    console.log('모든 게시글 요청됨.' + pageNumber + ' :' + typeof pageNumber);
    const filePath = 'src/datafile/database.txt';
    return this.postService.getPosts(filePath, pageNumber);
  }

  //게시글 하나 가져오기
  @Get(':id')
  @ApiOperation({
    summary: '특정 게시글조회',
    description: '게시글 한 개를 불러옵니다.',
  })
  @ApiResponse({ status: 200, description: '조회에 성공하였습니다' })
  getOnePost(@Param('id') id: number): PostDto {
    console.log('게시글 한개 요청됨.');
    const filePath = 'src/datafile/database.txt';
    return this.postService.getOnePost(id, filePath);
  }

  //게시글 쓰기
  @Post()
  @Redirect('/posts')
  @ApiBody({ type: PostDto })
  @ApiOperation({
    summary: '게시글 쓰기',
    description:
      '게시글을 작성합니다. 예시) {"data": {"id": 6,"userId":18453,"title": "Im number 1","content": "good to see you! goodbye"}}',
  })
  @ApiResponse({ status: 200, description: '작성을 성공하였습니다' })
  getData(@Body('data') data: CreatePostDto): boolean {
    console.log('게시글 쓰기 요청됨.');
    const filePath = 'src/datafile/database.txt';
    const result = data;
    this.postService.writePost(filePath, result);
    return true;
  }
}
