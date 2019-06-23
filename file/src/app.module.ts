import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { RequestModule } from './request/request.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ConfigModule, RequestModule, FilesModule],
  providers: [AppService],
})
export class AppModule {}
