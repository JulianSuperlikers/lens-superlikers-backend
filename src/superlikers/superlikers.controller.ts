import { Controller, Get, Query } from '@nestjs/common';
import { SuperlikersService } from './superlikers.service';
import { GetParticipantDto } from './dtos/get-participant.dto';

@Controller('superlikers')
export class SuperlikersController {
  constructor(private readonly superlikersService: SuperlikersService) {}

  @Get('participant')
  getParticipant(@Query() getParticipantDto: GetParticipantDto) {
    return this.superlikersService.getParticipant(getParticipantDto);
  }
}
