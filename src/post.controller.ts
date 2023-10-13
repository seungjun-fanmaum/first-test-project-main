import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Headers,
  Redirect,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPostDto';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { PostAndCountDto } from './dto/postsAndCountDto';
import { PostDto } from './dto/postDto';

//article에 대한 crud이다.
@ApiTags('article에 대한 api')
@Controller('posts')
@UseFilters(HttpExceptionFilter)
export class PostController {
  constructor(private readonly appService: PostService) {}

  //게시글 모두 가져오기
  @Get()
  @ApiOperation({
    summary: '게시글조회',
    description: '모든 게시글을 불러옵니다.',
  })
  @ApiResponse({ status: 200, description: '조회에 성공하였습니다' })
  getPosts(@Query('pageNumber') pageNumber: number): Promise<PostAndCountDto> {
    const filePath = 'src/datafile/database.txt';
    // const pageNumber=parseInt(page,10);
    console.log('게시물조회요청');

    return this.appService.getPosts(filePath, pageNumber);
  }

  //게시글 하나 가져오기
  @Get(':id')
  @ApiOperation({
    summary: '특정 게시글조회',
    description: '게시글 한 개를 불러옵니다.',
  })
  @ApiResponse({ status: 200, description: '조회에 성공하였습니다' })
  getOnePost(@Param('id') id: number): PostDto {
    const filePath = 'src/datafile/database.txt';

    return this.appService.getOnePost(id, filePath);
  }

  //게시글 쓰기
  @Post()
  @Redirect('/posts')
  @ApiBody({ type: PostDto })
  @ApiOperation({
    summary: '게시글 쓰기',
    description:
      '게시글을 작성합니다. 예시) {"data": {"id": "6","title": "Im number 1","content": "good to see you! goodbye"}}',
  })
  @ApiResponse({ status: 200, description: '작성을 성공하였습니다' })
  async getData(@Body('data') data: CreatePostDto): Promise<boolean> {
    const filePath = 'src/datafile/database.txt';
    const result = data;
    await this.appService.writePost(filePath, result);
    return true;
  }
}
