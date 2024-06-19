// Load Swagger JSON file
// Serve Swagger UI at /api-docs route
import * as swaggerUi from 'swagger-ui-express';
import { Swagger_app_controller } from './Swagger_app_controller';
// import { Swagger_wp_integration } from './Swagger_wp_integration';

export class SwaggerConfig {
  static setup(app: any) {
    const combinedSwagger = {
      ...Swagger_app_controller,
      paths: {
        ...Swagger_app_controller.paths,
        // ...Swagger_wp_integration.paths,
      },
      definitions: {
        ...Swagger_app_controller.definitions,
        // ...Swagger_wp_integration.definitions,
      },
    };

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwagger));
  }
}
