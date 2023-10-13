import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { CommentDto } from './dto/commentDto';

@Injectable()
export class CommentService {
  //모든 댓글 가져오기
  getComments(id: number, filePath: string): CommentDto[] {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      let dataArray = [];

      // 파일 내용을 JSON 배열로 파싱
      dataArray = JSON.parse(data);

      const result = [];

      // id를 기준으로 검색
      dataArray.filter((item) => {
        if (item.id === Number(id)) {
          const commentDto: CommentDto = {
            id: item.id,
            content: item.content,
          };
          result.push(commentDto);
        }
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        '게시물을 생성하는 중에 오류 발생',
      );
    }
  }
}
