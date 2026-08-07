import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('API LAPISCO - Gestão Livros e Autoreeeees')
    .setDescription('API RESTful para o Desafio Backend')
    .setVersion('1.0')
    .build();

  const dataSource = app.get(DataSource);

  await dataSource.runMigrations();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
