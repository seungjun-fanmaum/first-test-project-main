import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    FileService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class PostModule {}
