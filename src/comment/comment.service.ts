import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import { CommentDto } from '../dto/commentDto';
import { FileService } from 'src/file/file.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(private readonly fileService: FileService) {}

  //모든 댓글 가져오기
  getComments(id: number, filePath: string): CommentDto[] {
    //filservice
    const dataArray = this.fileService.getFile(filePath);

    const result = [];

    // id를 기준으로 검색
    dataArray.filter((item) => {
      if (item.id === Number(id)) {
        // const commentDto: CommentDto = {
        //   id: item.id,
        //   content: item.content,
        // };
        const commentDto = plainToInstance(CommentDto, item);
        result.push(commentDto);
      }
    });

    return result;
  }
}
