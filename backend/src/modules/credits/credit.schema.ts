import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Credit extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  requestedAmount: number;

  @Prop({ required: true })
  termMonths: number;

  @Prop({ required: true })
  monthlyIncome: number;

  @Prop({ default: Date.now })
  requestDate: Date;

  @Prop({ default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'
}

export const CreditSchema = SchemaFactory.createForClass(Credit);
