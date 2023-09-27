import { Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

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
