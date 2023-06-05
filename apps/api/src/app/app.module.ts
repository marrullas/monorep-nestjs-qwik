import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

//mongodb://root:example@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoDbUri(configService),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


function getMongoDbUri(configService: ConfigService) {
  const host = configService.get<string>('DB_HOST');
  const port = configService.get<string>('DB_PORT');
  const dbName = configService.get<string>('DB_NAME');
  const user = configService.get<string>('DB_USER');
  const pass = configService.get<string>('DB_PASS');
  return `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin&readPreference=primary&ssl=false&directConnection=true`;
}
