import { Module } from '@nestjs/common';
import { CreditModule } from './modules/credits/credit.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/mydb'),
    CreditModule,
  ],
})
export class AppModule {}
