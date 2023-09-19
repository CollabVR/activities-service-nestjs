import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseRpcExceptionFilter {
	catch(
		exception: Prisma.PrismaClientKnownRequestError,
		host: ArgumentsHost,
	): Observable<any> {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		switch (exception.code) {
			case 'P2002':
				const status = HttpStatus.CONFLICT;
				const message = exception.message.replace(/\n/g, '');
				response.status(status).json({
					statusCode: status,
					message: message,
				});
				break;
			default:
				// default 500 error code
				super.catch(exception, host);
				break;
		}
		return super.catch(exception, host);
	}
}
