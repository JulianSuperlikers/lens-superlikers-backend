import { Module } from '@nestjs/common';
import { VeryfiService } from './veryfi.service';
import { VeryfiController } from './veryfi.controller';

@Module({
  controllers: [VeryfiController],
  providers: [VeryfiService],
})
export class VeryfiModule {}
