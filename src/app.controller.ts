import {Controller, Get, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "./jwt-auth/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    /**
     * Returns a string indicating the status of the application.
     *
     * @return {string} The message indicating the status of the application.
     *
     * @example
     *
     * isWorking();
     * // Returns 'App is Working - V:1.0.0 - Thu Sep 30 2021 13:00:00 GMT+0000 (Coordinated Universal Time).
     * // Please check the API documentation at /api-docs'
     *
     */

    @Get()
    @ApiBearerAuth('access-token')
    // @ApiOperation({summary: 'Check if the API is working'})
    // @ApiResponse({status: 200, description: 'API is working correctly.'})
    isWorking(): string {
        return this.appService.isWorking();
    }

    @UseGuards(JwtAuthGuard)
    @Get('demo')
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Demo route'})
    @ApiResponse({status: 200, description: 'Returns a demo text.'})
    demo(): string {
        return 'demo';
    }
}
