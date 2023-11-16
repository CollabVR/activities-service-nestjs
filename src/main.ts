import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { RpcExceptionFilter } from './common/rcp-exception.filter';

async function bootstrap() {
	const port = 3000;
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.TCP,
		options: {
			host: 'activity_service',
			port: port,
		},
	} as TcpOptions);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.useGlobalFilters(new RpcExceptionFilter());
	app.useGlobalFilters(new PrismaClientExceptionFilter());

	await app.listen().then(() => console.log(`Running in port ${port}`));
}
bootstrap();
