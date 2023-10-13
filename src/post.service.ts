import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { CreatePostDto } from './dto/createPostDto';
import { PostAndCountDto } from './dto/postsAndCountDto';
import { PostDto } from './dto/postDto';
import { UUID } from 'crypto';

//한 페이지의 수
const pageSize: number = 5;

@Injectable()
export class PostService {
  //예외처리 필터에서 처리

  //모든게시글 가져오기
  // async getPosts(filePath: string, page: number): Promise<any> {
  //   return new Promise((resolve) => {
  //     fs.readFile(filePath, 'utf8', (err, data) => {
  //       //이렇게만 하면 오류가 나면 프로그램이 종료됨.
  //       // if (err) {
  //       //   reject(err);
  //       // }
  //       if (err) {
  //         throw new NotFoundException('파일 읽기 실패');
  //       }
  //       //json문자열을 javascript 객체로 파싱하는 부분
  //       const jsonData = JSON.parse(data);

  //       // 페이지네이션 로직
  //       const startIndex = (page - 1) * pageSize;
  //       const endIndex = startIndex + pageSize;
  //       const items = jsonData.slice(startIndex, endIndex);

  //       resolve(items);
  //     });
  //   }).catch((error) => {
  //     throw new NotFoundException('파일을 읽어와서 처리하는 중에 문제 발생');
  //   });
  // }
  //모든게시글 가져오기
  async getPosts(filePath: string, page: number): Promise<PostAndCountDto> {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);

      //page를 int로 바꾸는 작엄
      const pageInt = Number(page);

      //페이지네이션으로 원하는 페이지의 post만 가져오기
      const startIndex = (pageInt - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const items = jsonData.slice(startIndex, endIndex);

      //총 몇개의 Page가 있는지 확인
      const length = Object.keys(jsonData).length;
      const pageCount = Math.ceil(length / pageSize);

      if (page > pageCount || page < 1) {
        throw new InternalServerErrorException('페이지가 범위를 넘어감.');
      }

      const postAndCountDto: PostAndCountDto = {
        postDto: items,
        pageCount: pageCount,
      };

      return postAndCountDto;
    } catch (error) {
      throw new InternalServerErrorException('파일 읽어오는 중에 오류 발생');
    }
  }

  //게시글 개수 가져오기
  // getPostsNumber(filePath: string): any {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(filePath, 'utf8', (err, data) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       //json문자열을 javascript 객체로 파싱하는 부분
  //       const jsonData = JSON.parse(data);
  //       const length = Object.keys(jsonData).length;

  //       resolve(Math.ceil(length / pageSize));
  //     });
  //   });
  // }

  //게시글 한개 가져오기
  getOnePost(id: number, filePath: string): PostDto {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      let dataArray = [];

      // 파일 내용을 JSON 배열로 파싱
      dataArray = JSON.parse(data);

      // id를 기준으로 검색
      const foundItem = dataArray.find((item) => item.id === Number(id));

      const createPostDto: PostDto = {
        id: foundItem.id,
        userId: foundItem.userId,
        title: foundItem.title,
        content: foundItem.content,
      };

      return createPostDto;
    } catch {
      throw new InternalServerErrorException(
        '한개의 게시글을 읽어오는 중에 오류 발생',
      );
    }
  }

  //게시글 작성하기
  async writePost(filePath: string, newData: CreatePostDto): Promise<void> {
    try {
      // 기존 파일 내용을 읽기
      const data = fs.readFileSync(filePath, 'utf8');
      let result = '';
      let modifiedData = '';

      //기존 데이터가 있으면
      if (data) {
        const dataArray = JSON.parse(data);
        //일련번호(id)지정
        const id = Math.max(...dataArray.map((item) => item.id)) + 1;

        const newPost = {
          id: id,
          userId: newData.userId,
          title: newData.title,
          content: newData.content,
        };

        const nnewData = JSON.stringify(newPost, null, 2);
        modifiedData = data.slice(1, -1);
        result = '[' + modifiedData + ',' + nnewData + ']';
      }

      //없으면
      else {
        const id = 1;
        const newPost = {
          id: id,
          userId: newData.userId,
          title: newData.title,
          content: newData.content,
        };

        const nnewData = JSON.stringify(newPost, null, 2);
        result = '[' + nnewData + ']';
      }

      return new Promise<void>((resolve, reject) => {
        fs.writeFile(filePath, result, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
    } catch {
      throw new InternalServerErrorException(
        '게시물을 생성하는 중에 오류 발생',
      );
    }
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
