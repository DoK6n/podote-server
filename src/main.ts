import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log(`

              🚀 Podote GraphQL Server ready at: http://localhost:${PORT}
              ⭐️ front: https://podote.com

    `);
  });
}
bootstrap();
