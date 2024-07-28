import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const configureSwagger = (app: INestApplication) => {
  // Swagger integration
  const config = new DocumentBuilder()
    .setTitle('BackEnd Engine')
    .setDescription('API documentation for BackEnd Engine')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

export { configureSwagger };
