import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(json({ limit: '50mb' }));

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV');
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');

  app.enableCors({
    origin: nodeEnv === 'production' && allowedOrigins ? allowedOrigins.split(',') : true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
