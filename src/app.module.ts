import { Module } from '@nestjs/common';
import { FileModule } from './module/file.module';
import { ConfigModule } from '@nestjs/config';
import { fileUploader } from './controllers/file.controller';

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot({
      envFilePath:'AWS.env'
    })],
})  
export class AppModule {}
