import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // 예외 처리 로직을 이곳에 작성합니다.
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus(); // 예외에서 상태 코드 가져오기
    const message = exception.message || '예외가 발생했습니다.';

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
