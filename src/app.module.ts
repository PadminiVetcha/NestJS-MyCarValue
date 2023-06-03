import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    // used to specify the .env files that we actually want to read
    ConfigModule.forRoot({
      isGlobal: true, //making it true so that we don't reimport ConfigModule in other modules if required
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    //TypeOrmModule.forRoot(), // use this if you are using ormconfig.js else use below TypeOrmModule
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     *  setting up a global pipe inside app module to make e2e tests run.
     * This means when ever we create an instance of app module, make use of the value here and apply
     * it to every incoming request that flows into application.
     */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  /**
   * This configure function is going to be called automatically when appln starts with incoming
   * traffic. So here we set up middleware that runs for every incoming request.
   */
  configure(consumer: MiddlewareConsumer) {
    //used to configure cookie session and provide a string that us used in encryption
    consumer
      .apply(
        cookieSession({
          keys: ['abcdefg'],
        }),
      )
      .forRoutes('*');
  }
}
