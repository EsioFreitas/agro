import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AddHeadersInterceptor } from './interceptors/add-header.interceptor';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { NestFactory } from '@nestjs/core';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new RequestIdInterceptor());
  app.useGlobalInterceptors(new AddHeadersInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Dashboard API')
    .setDescription('API para gráficos de área cultivada')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['https://example.com', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
