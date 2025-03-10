import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credit } from './credit.schema';

export interface CreditOffer {
  id : number;
  bankName: string;
  approvedAmount: number;
  periodMonths: number;
  interestRate: number; 
  monthlyCost: number;
  offerUrl: string;
}

@Injectable()
export class CreditService {
  constructor(@InjectModel(Credit.name) private creditModel: Model<Credit>) {}

  async create(creditDto: any): Promise<Credit> {
    // const createdCredit = new this.creditModel(creditDto);
    // return createdCredit.save();
    return this.creditModel.create(creditDto);
  }

  async findAll(): Promise<Credit[]> {
    return this.creditModel.find().exec();
  }

  generateMockOffers(): CreditOffer[] {
    const offers: CreditOffer[] = [];

    for (let i = 0; i < 3; i++) {
      const approvedAmount = Math.floor(Math.random() * 5000) + 1000; // Montant approuvé entre 1000 et 6000
      const periodMonths = Math.floor(Math.random() * 24) + 12; // Durée entre 12 et 36 mois
      const interestRate = Math.floor(Math.random() * 10) + 5; // TAE entre 5% et 15%
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
