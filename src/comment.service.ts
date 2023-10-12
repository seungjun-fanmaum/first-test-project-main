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

  //직접 예외처리

  // //모든 댓글 가져오기
  // getComments(id: number, filePath: string): any {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(filePath, 'utf8', (readErr, data) => {
  //       if (readErr) {
  //         console.error('파일 읽기 중 오류 발생:', readErr);
  //         return;
  //       }

  //       let dataArray = [];

  //       try {
  //         // 파일 내용을 JSON 배열로 파싱
  //         dataArray = JSON.parse(data);
  //       } catch (parseErr) {
  //         console.error('파일 내용을 파싱하는 중 오류 발생:', parseErr);
  //         return;
  //       }

  //       // id를 기준으로 검색
  //       // const foundItem = dataArray.find(item => item.id === id);
  //       const foundItem = dataArray.filter((item) => item.id === id);

  //       if (foundItem) {
  //         console.log('검색 결과:', foundItem);
  //         resolve(foundItem);
  //       } else {
  //         console.log('일치하는 항목을 찾을 수 없습니다.');
  //         resolve('일치하는 항목이 없습니다.');
  //       }
  //     });
  //   });

  // }
}
