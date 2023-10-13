import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
// import { UserModule } from './user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './AllExceptionsFilter';

@Module({
  // imports: [UserModule],
  controllers: [PostController, CommentController],
  providers: [
    PostService,
    CommentService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
