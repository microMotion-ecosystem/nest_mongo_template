import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {MongodbModule} from './config/mongodb.module';
import {JwtStrategy} from "./core/jwt-auth/jwt.strategy";
import {CheckHeaderMiddleware} from "./core/middlewares/check-header.middleware";
import {HttpModule, HttpService} from "@nestjs/axios";
import {AuthApiService} from "./api-services/auth-api/auth-api.service";
import { TestModule } from './models/test/test.module';


@Module({
    imports: [
        MongodbModule,
        HttpModule,
        TestModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthApiService,
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
