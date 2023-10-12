import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CreatePostDto } from './dto/createPostDto';

//한 페이지의 수
const pageSize: number = 5;

@Injectable()
export class PostService {
  //예외처리 필터에서 처리

  //모든게시글 가져오기
  async getPosts(filePath: string, page: number): Promise<any> {
    return new Promise((resolve) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        //json문자열을 javascript 객체로 파싱하는 부분
        const jsonData = JSON.parse(data);

        // 페이지네이션 로직
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = jsonData.slice(startIndex, endIndex);

        resolve(items);
      });
    });
  }

  //게시글 개수 가져오기
  getPostsNumber(filePath: string): any {
    return new Promise((resolve) => {
      fs.readFile(filePath, 'utf8', (readErr, data) => {
        //json문자열을 javascript 객체로 파싱하는 부분
        const jsonData = JSON.parse(data);
        const length = Object.keys(jsonData).length;

        resolve(Math.ceil(length / pageSize));
      });
    });
  }

  //게시글 한개 가져오기
  getOnePost(id: number, filePath: string): any {
    return new Promise((resolve) => {
      fs.readFile(filePath, 'utf8', (readErr, data) => {
        let dataArray = [];

        // 파일 내용을 JSON 배열로 파싱
        dataArray = JSON.parse(data);

        // id를 기준으로 검색
        const foundItem = dataArray.find((item) => item.id === id);

        resolve(foundItem);
      });
    });
  }

  //게시글 작성하기
  async writePost(filePath: string, newData: CreatePostDto): Promise<void> {
    // 기존 파일 내용을 읽기
    fs.readFile(filePath, 'utf8', (readErr, data) => {
      let result = '';
      let modifiedData = '';

      const nnewData = JSON.stringify(newData, null, 2);

      //기존 데이터가 있으먄
      if (data) {
        modifiedData = data.slice(1, -1);
        result = '[' + modifiedData + ',' + nnewData + ']';
      }
      //없으면
      else {
        result = '[' + nnewData + ']';
      }

      return new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, result, (err) => {
          resolve();
        });
      });
    });
  }

  // 예외처리 직접

  // //모든게시글 가져오기
  // async getPosts(filePath: string, page: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(filePath, 'utf8', (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         try {
  //           //json문자열을 javascript 객체로 파싱하는 부분
  //           const jsonData = JSON.parse(data);

  //           // 페이지네이션 로직
  //           const startIndex = (page - 1) * pageSize;
  //           const endIndex = startIndex + pageSize;
  //           const items = jsonData.slice(startIndex, endIndex);

  //           resolve(items);
  //         } catch (parseError) {
  //           reject(parseError);
  //         }
  //       }
  //     });
  //   });
  // }

  // //게시글 개수 가져오기
  // getPostsNumber(filePath: string): any {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(filePath, 'utf8', (readErr, data) => {
  //       if (readErr) {
  //         console.error('파일 읽기 중 오류 발생:', readErr);
  //         return;
  //       }
  //       else {
  //         try {
  //           //json문자열을 javascript 객체로 파싱하는 부분
  //           const jsonData = JSON.parse(data);
  //           const length = Object.keys(jsonData).length;
  //           resolve(Math.ceil(length/pageSize));
  //         } catch (parseError) {
  //           reject(parseError);
  //         }}
  //     });
  //   });
  // }

  // //게시글 한개 가져오기
  // getOnePost(id: number, filePath: string): any {
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

  //       // 검색할 id
  //       // const searchId = "32";

  //       // id를 기준으로 검색
  //       const foundItem = dataArray.find((item) => item.id === id);

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

  // //게시글 작성하기
  // async writePost(filePath: string, newData: CreatePostDto): Promise<void> {
  //   // 기존 파일 내용을 읽기
  //   fs.readFile(filePath, 'utf8', (readErr, data) => {
  //     let result = '';
  //     let modifiedData = '';
  //     const nnewData = JSON.stringify(newData, null, 2);

  //     //기존 데이터가 있으먄
  //     if (data) {
  //       modifiedData = data.slice(1, -1);
  //       result = '[' + modifiedData + ',' + nnewData + ']';
  //     }
  //     //없으면
  //     else {
  //       result = '[' + nnewData + ']';
  //     }

  //     return new Promise<void>((resolve, reject) => {
  //       fs.writeFile(filePath, result, (err) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve();
  //         }
  //       });
  //     });
  //   });
  // }
}
