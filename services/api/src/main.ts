import {
  ArgumentMetadata,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { lookup } from 'dns/promises';
import { RootModule } from './modules/RootModule';

async function resolveHost(hostname: string) {
  return (await lookup(hostname)).address;
}

class Test implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value });
  }
}

const envs = [
  'BCRYPT_SALT',
  //
  'CLIENT_HOST',
  'CLIENT_PORT',
  //
  'JWT_EXPIRATION_TIME',
  'JWT_SECRET_KEY',
];

async function bootstrap() {
  const PORT = 3000 || process.env.API_PORT;

  const adress = (await lookup('api')).address;
  console.log(`http://${adress}:${PORT}`);

  for (const env_key of envs) {
    const env_value = process.env[env_key];
    if (!env_value) throw new Error(`Missing env property called "${env_key}"`);
  }

  //@ts-ignore
  process.env.BCRYPT_SALT = +process.env.BCRYPT_SALT as number;

  const CLIENT_HOST = process.env.CLIENT_HOST;
  const CLIENT_PORT = process.env.CLIENT_PORT;
  const CLIENT_IP = await resolveHost(CLIENT_HOST);

  const CLIENT_ADRESS = `http://${CLIENT_IP}:${CLIENT_PORT}`;

  const app = await NestFactory.create(RootModule);

  app.enableCors({
    origin: [CLIENT_ADRESS],
    methods: ['POST', 'PATCH', 'PUT', 'DELETE', 'GET'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('/api');

  await app.listen(PORT);
}
bootstrap();
