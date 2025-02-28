import { Module } from '@nestjs/common';
import { DocumentProcessingService } from './services/document-processing/document-processing.service';
import { DocumentProcessingController } from './controllers/document-processing/document-processing.controller';
import { SuperlikersModule } from '@superlikers/superlikers.module';
import { VeryfiModule } from '@veryfi/veryfi.module';

@Module({
  imports: [SuperlikersModule, VeryfiModule],
  providers: [DocumentProcessingService],
  controllers: [DocumentProcessingController],
})
export class CoreModule {}
