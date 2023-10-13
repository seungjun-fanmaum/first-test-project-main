import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CommentService {
  //예외처리 필터

  //모든 댓글 가져오기
  getComments(id: number, filePath: string): any {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (readErr, data) => {
        let dataArray = [];

        // 파일 내용을 JSON 배열로 파싱
        dataArray = JSON.parse(data);

        // id를 기준으로 검색
        const foundItem = dataArray.filter((item) => item.id === Number(id));

        resolve(foundItem);
      });
    });
  }
}
