import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { CreditOffer, CreditService } from './credit.service';
import { Credit } from './credit.schema';

@Controller('credits')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post()
  async create(@Body() creditDto: any): Promise<Credit> {
    return this.creditService.create(creditDto);
  }

  @Get()
  async findAll(): Promise<Credit[]> {
    return this.creditService.findAll();
  }

  @Get('user/:userId')
  async findByUserID(@Param('userId') userId: string): Promise<Credit[]> {
    return this.creditService.findByUserID(userId);
  }


  @Get('offers')
  async getMockOffers(): Promise<CreditOffer[]> {
    return this.creditService.generateMockOffers();
  }
}