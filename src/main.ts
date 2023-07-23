import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RMQ_URL')],
      queue: 'ToMs1',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices().then(() => {
    console.log('MS1 started.');
  });
  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `API Gateway started on ${process.env.APP_PORT} at ${new Date()}.`,
    );
    console.log('Application variables:');
    console.log('RabbitMQ address:', process.env.RMQ_URL);
  });
}

bootstrap();
