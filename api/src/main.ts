import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
  await app.listen(3001); // pour tester en local (car le front utilise le 3000)
}
bootstrap();
