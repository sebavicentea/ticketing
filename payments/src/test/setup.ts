import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51IWkuOASTVXhtXkt7KgiAn1tDooFjs2RMrKYCYMHUhNtnkOFTbLpJ8gy0JAKoEpyfrIOidBchqeGFPHh8VCMmjtb00dK7x1Vtg'

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdadaf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const token = jwt.sign(
    {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
    },
    process.env.JWT_KEY!
  );

  const session = { jwt: token };
  
  const sessionJSON = JSON.stringify(session);

  const base64= Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
}