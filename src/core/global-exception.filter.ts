import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        Logger.log(' GlobalExceptionFilter :: Enter  ');
        Logger.log(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
            message = 'Internal Server Error',
            error = exception;

        statusCode = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception?.message || 'Internal Server Error';
        error = exception?.response?.message || exception?.message;

        Logger.log(' GlobalExceptionFilter :: Error  => ' + message);
        Logger.log(' GlobalExceptionFilter :: Exit  ');
        response.status(statusCode).json({
            status_code: statusCode,
            message: message,
            error: error
        });
    }
}
