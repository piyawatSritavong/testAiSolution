import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เปิดใช้งาน CORS
  app.enableCors({
    origin: 'http://localhost:3000', // อนุญาตเฉพาะจาก origin นี้
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // หากต้องการส่ง cookie หรือข้อมูลที่ต้องยืนยันตัวตน
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
