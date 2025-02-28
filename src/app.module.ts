import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperlikersModule } from './superlikers/superlikers.module';
import { VeryfiModule } from './veryfi/veryfi.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(), VeryfiModule, SuperlikersModule, SharedModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
