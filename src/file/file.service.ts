import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { CommentDto } from '../dto/commentDto';
import { PostDto } from 'src/dto/postDto';
import { FileReadError } from '../custom-error';

@Injectable()
export class FileService {
  //파일 읽기
  //일어날 수 있는 에러 종류
  //1. 파일 형식 오류로 파일 자체를 못불러올 때
  //2. 파싱이 안될 때
  getFile(filePath: string): PostDto[] {
    try {
      //가져와서 파싱한 결과를 리턴
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);

      return jsonData;
    } catch {
      throw new FileReadError('파일을 읽어오는 중에 오류 발생 by custom error');
    }
  }
  //파일 쓰기
  writeFile(filePath: string, data: string) {
    try {
      fs.writeFileSync(filePath, data);
    } catch (error) {
      throw new FileReadError('파일에 쓰는 중에 에러 발생');
    }
  }
}
