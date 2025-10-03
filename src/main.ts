import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedAdmin } from 'seeds/admin.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource); //grabs the TypeORM DataSource instance that Nest is using to talk to your DB.
  await seedAdmin(dataSource);   // 👈 call seed function

  // enable global validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
