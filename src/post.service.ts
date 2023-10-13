import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import { CreatePostDto } from './dto/createPostDto';
import { PostAndCountDto } from './dto/postsAndCountDto';
import { PostDto } from './dto/postDto';

//한 페이지의 수
const pageSize: number = 5;

@Injectable()
export class PostService {
  //예외처리 필터에서 처리

  //모든게시글 가져오기
  getPosts(filePath: string, page: number): PostAndCountDto {
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
    } catch (error) {
      throw new InternalServerErrorException(
        '한개의 게시글을 읽어오는 중에 오류 발생',
      );
    }
  }

  //게시글 작성하기
  writePost(filePath: string, newData: CreatePostDto): void {
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

      fs.writeFileSync(filePath, result);
    } catch (error) {
      throw new InternalServerErrorException(
        '게시물을 생성하는 중에 오류 발생',
      );
    }
  }
}
