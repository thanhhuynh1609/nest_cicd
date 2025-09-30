import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import 'dotenv/config';
import express from 'express';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { AdminSeederService } from './shared/admin-seeder.service';

if (process.env.NODE_ENV === 'test') {
  process.env.MONGO_URI = process.env.MONGO_URI_TEST;
  console.log('----------TESTING IN PROCESS----------');
  console.log('using database', process.env.MONGO_URI);
}

const server = express();
server.use(cors());
server.get('/', (req, res) => res.send('ok'));
server.get('/_ah/health', (req, res) => res.send('ok'));
server.get('/_ah/start', (req, res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  
  // Chạy admin seeder
  const adminSeeder = app.get(AdminSeederService);
  await adminSeeder.seedAdmin();
  
  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: http://localhost:${process.env.PORT || 8080}`);
  console.log('Default admin user: admin / 123');
}
bootstrap();



