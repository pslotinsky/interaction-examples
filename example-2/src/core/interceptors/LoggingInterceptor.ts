import { Logger, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();
        const [{ url, method, connection: { remoteAddress }, headers: { host }, body }] = context.getArgs();
        const message = `remote-address: ${remoteAddress} ${method} http://${host}${decodeURI(url)}`;
        Logger.debug(`Start request ${message}`);
        Logger.verbose(`Body: ${JSON.stringify(body)}`);

        const complite = (responseData: any) => {
            const time = Date.now() - startTime;
            Logger.log(`Request ${message} ${time}ms`);
            Logger.verbose(`Response-body: ${JSON.stringify(responseData)}`);
        };

        return next
            .handle()
            .pipe(tap(complite, complite));
    }
}
