import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();
  const port = configService.get<number>('PORT') ?? 5002;
  // const port = process.env.PORT ?? 3000;

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //sử dụng pipe,
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các trường không được định nghĩa trong DTO
      forbidNonWhitelisted: true, //báo lỗi khi gửi dư trường dữ liệu
      transform: true, // Bật biến đổi object, tự động chuyển đổi các đối tượng gửi lên thành instance (thực thể) của lớp DTO
      //transformOptions: { enableImplicitConversion: true }, // Tự động ép kiểu dựa trên kiểu dữ liệu đã khai báo trong DTO
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  //format câu log
  const logger = new Logger('bootstrap');
  logger.log(`Server started on port ${port}`);

  await app.listen(port);
}
bootstrap();
