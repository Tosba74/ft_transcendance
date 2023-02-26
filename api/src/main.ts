import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new ValidationPipe({
  //     whitelist: true, // filter out properties that should not be received by the method handler (strip all properties that don't have any decorators)
  //   }),
  // );

  const config = new DocumentBuilder()
    .setTitle('Transcendance API')
    .setDescription('Transcendance API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(4000);
}
bootstrap();
