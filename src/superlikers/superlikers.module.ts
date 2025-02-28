import { Module } from '@nestjs/common';
import { SuperlikersService } from './superlikers.service';
import { SuperlikersController } from './superlikers.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [SuperlikersController],
  providers: [SuperlikersService],
  exports: [SuperlikersService],
})
export class SuperlikersModule {}
