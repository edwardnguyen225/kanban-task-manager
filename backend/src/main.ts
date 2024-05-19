import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Automatically strip out non-whitelisted properties
      forbidNonWhitelisted: true, // Throw an error when non-whitelisted properties are present
    }),
  );
  app.setGlobalPrefix('api');

  // Enable CORS for http://localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(PORT);
}
bootstrap();
