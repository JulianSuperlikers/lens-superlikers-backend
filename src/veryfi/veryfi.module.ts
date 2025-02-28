import { Module } from '@nestjs/common';
import { VeryfiService } from './veryfi.service';
import { VeryfiController } from './veryfi.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [VeryfiController],
  providers: [VeryfiService],
  exports: [VeryfiService],
})
export class VeryfiModule {}
