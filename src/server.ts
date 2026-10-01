import 'reflect-metadata';
import { Controller, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';

// TCP address this microservice listens on
const HOST = 'localhost';
const PORT = 4001;

// Shape of the payload sent by the client
interface GetCustomerRequest {
  id: number;
}

@Controller()
class CustomerController {
  // Handles every TCP message whose pattern is { cmd: 'get_customer' }
  @MessagePattern({ cmd: 'get_customer' })
  getCustomer(@Payload() data: GetCustomerRequest) {
    console.log('Message received:', data);

    // The returned value is sent back to the client as the response
    return {
      id: data.id,
      name: 'Noshin',
      source: 'Customer Service',
    };
  }
}

@Module({
  controllers: [CustomerController],
})
class CustomerModule {}

async function bootstrap() {
  // Create a NestJS microservice that uses TCP instead of HTTP
  const app = await NestFactory.createMicroservice(CustomerModule, {
    transport: Transport.TCP,
    options: { host: HOST, port: PORT },
  });

  await app.listen();
  console.log(`Customer Service is listening on TCP ${HOST}:${PORT}`);
}

bootstrap();
