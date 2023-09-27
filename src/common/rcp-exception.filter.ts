import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
	catch(exception: any) {
		// You can further customize the error response here
		const message = exception.message || 'Internal server error';
		// response.status(status).json({
		// 	statusCode: status,
		// 	message: message,
		// });
		throw new RpcException(message);
	}
}
