import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SuperlikersService } from './superlikers.service';
import { GetParticipantDto } from './dtos/get-participant.dto';
import { RegisterSaleDto } from './dtos/register-sale.dto';

@Controller('superlikers')
export class SuperlikersController {
  constructor(private readonly superlikersService: SuperlikersService) {}

  @Get('participant')
  getParticipant(@Query() getParticipantDto: GetParticipantDto) {
    return this.superlikersService.getParticipant(getParticipantDto);
  }

  @Post('register_sale')
  registerSale(@Body() registerSaleDto: RegisterSaleDto) {
    return this.superlikersService.registerSale(registerSaleDto);
  }
}
