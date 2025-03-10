import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credit } from './credit.schema';
import { RabbitMQService } from './rabbitmq.service';

export interface CreditOffer {
  id: number;
  bankName: string;
  approvedAmount: number;
  periodMonths: number;
  interestRate: number;
  monthlyCost: number;
  offerUrl: string;
}

@Injectable()
export class CreditService {
  constructor(
    @InjectModel(Credit.name) private creditModel: Model<Credit>,
    private readonly rabbitmqService: RabbitMQService,
  ) {}

  async create(creditDto: any): Promise<Credit> {
    const createdCredit = await this.creditModel.create(creditDto);

    await this.rabbitmqService.sendToQueue(creditDto);

    return createdCredit;
  }

  async findAll(): Promise<Credit[]> {
    return this.creditModel.find().exec();
  }

  generateMockOffers(): CreditOffer[] {
    const offers: CreditOffer[] = [];

    for (let i = 0; i < 3; i++) {
      const approvedAmount = Math.floor(Math.random() * 5000) + 1000;
      const periodMonths = Math.floor(Math.random() * 24) + 12;
      const interestRate = Math.floor(Math.random() * 10) + 5;
      const monthlyCost = (approvedAmount * (1 + interestRate / 100)) / periodMonths;

      offers.push({
        id: i + 1,
        bankName: `Fantasia Bank ${i + 1}`,
        approvedAmount,
        periodMonths,
        interestRate,
        monthlyCost: parseFloat(monthlyCost.toFixed(2)),
        offerUrl: `https://www.fantasiabank${i + 1}.com/offer`,
      });
    }

    return offers;
  }
}

