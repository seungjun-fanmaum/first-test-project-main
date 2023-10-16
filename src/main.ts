import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { PostModule } from './post/post.module';
// import { CommentModule } from './comment/comment.module';
import { AppModule } from './Appmodule';
import { ValidationPipe } from '@nestjs/common';

// import cors from 'cors';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Swagger Example')
    .setDescription('Swagger study API description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);
  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  SwaggerModule.setup('api', app, document);
  //

  app.use(cors());
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
