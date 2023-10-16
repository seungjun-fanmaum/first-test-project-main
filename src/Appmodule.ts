import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PostModule, CommentModule, FileModule], // 다른 모듈을 여기서 임포트
})
export class AppModule {}
