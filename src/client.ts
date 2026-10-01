import 'reflect-metadata';
import { firstValueFrom } from 'rxjs';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

// Address of the Customer Service (change PORT to 4002 to test a connection error)
const HOST = 'localhost';
const PORT = 4001;

// The message we send: the pattern selects the handler, the payload is the data
const PATTERN = { cmd: 'get_customer' };
const PAYLOAD = { id: 10, name: 'freetime' };

async function main() {
  // A minimal TCP client that acts as our "Postman" for microservices
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: HOST, port: PORT },
  });

  try {
    // send() returns an Observable; we only need the first (and only) response
    const response = await firstValueFrom(client.send(PATTERN, PAYLOAD));
    console.log('Response received:', response);
  } catch (error: any) {
    console.error('TCP Error:', error?.message ?? error);
  } finally {
    // Close the TCP connection so the process can exit
    await client.close();
  }
}

main();
