import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  try {
    await app.listen(PORT, () =>
      console.log(`Server listening on PORT ${PORT}`),
    );
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
