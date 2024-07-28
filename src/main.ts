import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { registerGlobals } from './register.globals';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { configureSwagger } from './swagger.config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  // Swagger documentation
  configureSwagger(app);
  await registerGlobals(app);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
