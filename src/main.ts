import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

function flattenErrors(errors: any[], out: any[] = []) {
  for (const e of errors) {
    // Log class name and property being validated
    console.log(
      'VALIDATION ERROR TARGET:',
      e.target?.constructor?.name ?? null,
      ' property:',
      e.property,
    );
    out.push({
      targetClass: e.target?.constructor?.name ?? null,
      property: e.property,
      constraints: e.constraints,
      children: e.children?.length ?? 0,
    });
    if (e.children && e.children.length) {
      flattenErrors(e.children, out);
    }
  }
  return out;
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors = []) => {
        const detailed = flattenErrors(validationErrors);
        console.log(
          'FULL VALIDATION ERRORS:',
          JSON.stringify(detailed, null, 2),
        );
        return new BadRequestException({
          message: detailed,
          error: 'Bad Request',
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
