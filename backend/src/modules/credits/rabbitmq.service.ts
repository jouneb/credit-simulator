import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private channel: amqp.Channel;
  private connection: amqp.Connection;

  async onModuleInit() {
    await this.connect(); 
  }

  private async connect() {
    try {
      console.log('Attempting to connect to RabbitMQ...');
      this.connection = await amqp.connect('amqp://rabbitmq:5672');
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue('creditQueue', { durable: true });
      console.log('Successfully connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ', error);
      setTimeout(() => this.connect(), 5000); 
    }
  }

  async sendToQueue(message: any) {
    if (this.channel) {
      const msg = JSON.stringify(message);
      this.channel.sendToQueue('creditQueue', Buffer.from(msg), { persistent: true });
      console.log('Message sent to RabbitMQ:', msg);
    } else {
      console.error('RabbitMQ channel is not defined');
    }
  }

  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
