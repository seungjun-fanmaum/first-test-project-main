import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from '../dto/createPostDto';
import { PostAndCountDto } from '../dto/postsAndCountDto';
import { PostDto } from '../dto/postDto';
import { FileService } from 'src/file/file.service';
import { plainToInstance } from 'class-transformer';

//한 페이지의 수
const pageSize: number = 5;

@Injectable()
export class PostService {
  constructor(private readonly fileService: FileService) {}

  //모든게시글 가져오기
  getPosts(filePath: string, page: number): PostAndCountDto {
    //filservice
    const jsonData = this.fileService.getFile(filePath);

    //페이지네이션으로 원하는 페이지의 post만 가져오기
    const startIndex = (Number(page) - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = jsonData.slice(startIndex, endIndex);

    //총 몇개의 Page가 있는지 확인
    const length = Object.keys(jsonData).length;
    const pageCount = Math.ceil(length / pageSize);

    if (page > pageCount || page < 1) {
      throw new InternalServerErrorException('페이지가 범위를 넘어감.');
    }

    //class-transformer 적용
    // const postAndCountDto: PostAndCountDto = {
    //   postDto: items,
    //   pageCount: pageCount,
    // };
    const postAndCountDto = plainToInstance(PostAndCountDto, {
      postDto: items,
      pageCount: pageCount,
    });

    return postAndCountDto;
  }

  //게시글 한개 가져오기
  getOnePost(id: number, filePath: string): PostDto {
    //filservice
    const dataArray = this.fileService.getFile(filePath);

    // id를 기준으로 검색
    const foundItem = dataArray.find((item) => item.id === Number(id));

    //class=transformer적용
    // const createPostDto: PostDto = {
    //   id: foundItem.id,
    //   userId: foundItem.userId,
    //   title: foundItem.title,
    //   content: foundItem.content,
    // };
    const createPostDto = plainToInstance(PostDto, foundItem);
    console.log(createPostDto);

    return createPostDto;
  }

  //게시글 작성하기
  writePost(filePath: string, newData: CreatePostDto): void {
    //filservice
    const dataArray = this.fileService.getFile(filePath);

    let result = '';

    //기존 데이터가 있으면
    if (dataArray) {
      //일련번호(id)지정
      const id = Math.max(...dataArray.map((item) => item.id)) + 1;

      //class-transformer가 필요할까?
      // const newPost = {
      //   id: id,
      //   userId: newData.userId,
      //   title: newData.title,
      //   content: newData.content,
      // };
      // title: newData.title,
      const newPost = plainToInstance(PostDto, {
        id: id,
        userId: newData.userId,
        title: newData.title,
        content: newData.content,
      });
      dataArray.push(newPost);
      result = JSON.stringify(dataArray, null, 2);
    }

    //기존 데이터가 없으면
    else {
      const id = 1;
      //class-transformer 적용
      // const newPost = {
      //   id: id,
      //   userId: newData.userId,
      //   title: newData.title,
      //   content: newData.content,
      // };
      const newPost = plainToInstance(PostDto, {
        id: id,
        userId: newData.userId,
        title: newData.title,
        content: newData.content,
      });

      const nnewData = JSON.stringify(newPost, null, 2);
      result = '[' + nnewData + ']';
    }

    //fileservie
    this.fileService.writeFile(filePath, result);
  }
}
