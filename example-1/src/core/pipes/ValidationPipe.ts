import { PipeTransform, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ValidationPipe implements PipeTransform<any> {
    public async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object, {
            whitelist: false,
            forbidUnknownValues: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            Logger.debug(`Validation errors: ${JSON.stringify(errors, null, 4)}`);
            throw new BadRequestException('Validation failed');
        }
        return object;
    }

    // tslint:disable-next-line: ban-types
    private toValidate(metatype: Function): boolean {
        // tslint:disable-next-line: ban-types
        const types: Set<Function> = new Set([String, Boolean, Number, Array, Object]);
        return !types.has(metatype);
    }
}
