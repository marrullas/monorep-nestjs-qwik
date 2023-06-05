/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
//import { MongoExceptionFilter } from './filters/MongoExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const globalPrefix = 'api';
  //Elementos de configuracion global de la app
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new MongoExceptionFilter())
  const port = process.env.PORT || 3000;
  //generar documentacion
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Monorep API')
  .setDescription('Este es el API de la aplicación monorepo')
  .setVersion('1.0')
  .addTag('monorepo')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
