import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options:{
      host: 'localhost',
      port: 4000
    }
  })

  await app.startAllMicroservicesAsync()
  await app.listen(3000);
  console.log('Auth microservices running')
}
bootstrap();
