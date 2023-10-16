import { Module, ValidationPipe } from '@nestjs/common';
import { FileService } from './file.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { FileExceptionFilter } from 'src/custom-exception.filter';

@Module({
  providers: [
    FileService,
    {
      provide: APP_FILTER,
      useClass: FileExceptionFilter,
    },
  ],
})
export class FileModule {}
