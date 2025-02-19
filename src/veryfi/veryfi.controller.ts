import { Controller } from '@nestjs/common';
import { VeryfiService } from './veryfi.service';

@Controller('veryfi')
export class VeryfiController {
  constructor(private readonly veryfiService: VeryfiService) {}
}
