# NestJS TCP Tester Demo

A very small project for a tutorial video:
HTTP/Postman vs. TCP communication between NestJS microservices.

## Project structure

```text
src/
├── server.ts   # Customer Service: a NestJS microservice listening on TCP
└── client.ts   # A tiny TCP client that sends one message to the service
```

## 1) Install

Node.js 20+ is recommended.

```bash
npm install
```

## 2) Run the Customer Service

First terminal:

```bash
npm run start:server
```

You should see something like:

```text
Customer Service is listening on TCP localhost:4001
```

## 3) Send a TCP message

Second terminal:

```bash
npm run start:client
```

Client output:

```text
Response received: { id: 10, name: 'Noshin', source: 'Customer Service' }
```

And in the first terminal you should see:

```text
Message received: { id: 10, name: 'freetime' }
```

## 4) What happened in the code

The client sent this message:

```text
Pattern:
{ cmd: 'get_customer' }

Payload:
{ id: 10, name: 'freetime' }
```

And the server received it because of this `MessagePattern`:

```ts
@MessagePattern({ cmd: 'get_customer' })
```

The value returned by the handler is sent back to the client as the response.

## 5) Testing an error

In `src/client.ts`, temporarily change the port from:

```ts
const PORT = 4001;
```

to:

```ts
const PORT = 4002;
```

and run again:

```bash
npm run start:client
```

This time you should see a TCP connection error, because no service is listening on port 4002.

Afterwards, set the port back to 4001.

## Suggested video outline

1. Show that for HTTP we usually have Postman/Swagger.
2. Ask: "What about TCP between microservices?"
3. Show `server.ts` and explain `MessagePattern`.
4. Show `client.ts` and explain that it acts as our test TCP client.
5. Run the server in the first terminal.
6. Run the client in the second terminal.
7. Show both the message received by the server and the client's response.
8. Use a wrong port and show the error.
9. Wrap up: "Instead of an HTTP request, we sent a TCP message with a Pattern and a Payload."

## Note

This project is intentionally simple and is meant for understanding and demonstrating
TCP communication in NestJS. It is not intended to be a general-purpose Postman-like tool.
