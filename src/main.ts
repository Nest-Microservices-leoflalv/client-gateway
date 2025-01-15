import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  RpcCustomExceptionFilter,
  RpcCustomExceptionInterceptor,
} from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());
  app.useGlobalInterceptors(new RpcCustomExceptionInterceptor());

  await app.listen(envs.PORT);

  console.log(`Gateway is running on: http://localhost:${envs.PORT}`);

  logger.log(`Gateway is running on: http://localhost:${envs.PORT}`);
}
bootstrap();
