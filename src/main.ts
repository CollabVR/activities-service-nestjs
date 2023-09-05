import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// // binds ValidationPipe to the entire application
	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		whitelist: true,
	// 	}),
	// );

	// apply transform to all responses
	// app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Account Management Service')
		.setDescription('API Description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);

	await app.listen(3200);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
