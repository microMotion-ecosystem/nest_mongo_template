import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongodbModule} from './mongodb/mongodb.module';
import {JwtStrategy} from "./jwt-auth/jwt.strategy";
import {CheckHeaderMiddleware} from "./check-header/check-header.middleware";
import { AuthMicroserviceService } from './jwt-auth/auth-microservice/auth-microservice.service';
import {HttpModule, HttpService} from "@nestjs/axios";


@Module({
    imports: [
        MongodbModule,
        HttpModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthMicroserviceService,
        JwtStrategy
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckHeaderMiddleware /* , otherMiddleWare */)
            .forRoutes({path: '*', method: RequestMethod.ALL} /* OR AppController */);
      /*  // to implement other middleware:
       consumer
            .apply(NewMiddleware)
            .forRoutes({ path: 'demo', method: RequestMethod.GET });*/

    }
}
