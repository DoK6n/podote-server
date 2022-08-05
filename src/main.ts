import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  await app.listen(3001, () => {
    Logger.log(`

              🚀 Podote GraphQL Server ready at: http://localhost:3001
              ⭐️ front: https://podote.com

    `);
  });
}
bootstrap();
