import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongodbModule} from './mongodb/mongodb.module';
import {JwtStrategy} from "./jwt-auth/jwt.strategy";
import {CheckHeaderMiddleware} from "./check-header/check-header.middleware";


@Module({
    imports: [
        MongodbModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtStrategy
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckHeaderMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
