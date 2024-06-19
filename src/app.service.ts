import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    isWorking(): string {
        return (
            'App is Working - V:' +
            process.env.APP_VERSION +
            ' - ' +
            new Date().toDateString() +
            ' ' +
            new Date().toTimeString() +
            '.\nPlease check the API documentation at /api-docs'
        );
    }
}
