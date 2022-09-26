import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['log', 'error', 'warn']
        : ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const PORT = process.env.PORT || 3000;

  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  });

  await app.listen(PORT, () => {
    Logger.log(`

              🚀 Podote GraphQL Server ready at: ${
                process.env.NODE_ENV === 'production'
                  ? 'https://api.podote.click'
                  : `http://localhost:${PORT}`
              }
              ⭐️ front: https://podote.com

    `);
  });
}
bootstrap();
