import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dtsGenerator from 'dtsgenerator';
import { writeFileSync, readFileSync } from 'fs';

export function generateSchema(app: INestApplication): OpenAPIObject {
    const options = new DocumentBuilder()
        .setTitle('Example')
        .setDescription('Example API description')
        .setVersion('1.0')
        .build();

    return SwaggerModule.createDocument(app, options);
}

export function useSchema(app: INestApplication, schema: OpenAPIObject): void {
    SwaggerModule.setup('swagger', app, schema);
}

export async function generateTypes(schema: OpenAPIObject, path: string): Promise<void> {
    const dts = await dtsGenerator({
        contents: [schema],
        namespaceName: '',
    });
    const data = dts.replace(/declare/g, 'export');

    const previousData = readFileSync(path);
    if (previousData.toString() !== data) {
        writeFileSync(path, data);
    }
}
