
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Credit, CreditSchema } from './credit.schema';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Credit.name, schema: CreditSchema }])],
  providers: [CreditService, RabbitMQService],
  controllers: [CreditController],
})
export class CreditModule {}
