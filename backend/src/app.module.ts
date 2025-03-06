import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditModule } from './modules/credits/credit.module';
import { MongooseDatabaseModule } from './mongoose.module';

@Module({
  imports: [
  MongooseDatabaseModule,
  CreditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
