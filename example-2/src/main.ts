import moduleAlias = require('module-alias');
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

moduleAlias.addAlias({
  '@account': __dirname + '/src/account',
  '@consumer': __dirname + '/src/consumer',
  '@core': __dirname + '/src/core',
  '@order': __dirname + '/src/order',
});

import { AppModule } from 'AppModule';
import { generateSchema, useSchema, generateTypes } from '@core/swagger';
import { ValidationPipe } from '@core/pipes/ValidationPipe';
import { LoggingInterceptor } from '@core/interceptors/LoggingInterceptor';

const TYPES_PATH = __dirname + '/../src/core/types.d.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const schema = generateSchema(app);
  useSchema(app, schema);
  await generateTypes(schema, TYPES_PATH);

  await app.listen(3001);

  Logger.log('Server started on port 3001');
}

bootstrap();
