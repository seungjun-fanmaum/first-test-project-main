import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { FileService } from 'src/file/file.service';

@Module({
  // imports: [UserModule],
  controllers: [CommentController],
  providers: [
    CommentService,
    FileService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class CommentModule {}
