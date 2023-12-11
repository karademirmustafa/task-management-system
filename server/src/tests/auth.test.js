const supertest = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("register auth", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

    describe("POST /auth/register", () => {
      it("should register a user with name, password, and email", async () => {
      
        const response = await supertest(app)
          .post("/api/auth/register")
          .set("Content-Type", "application/json")
          .send({
            name:'John derere',
            email:'sdadsadsad@gmail.com',
            password:'sadsadasdsa'
          });
        expect(response.statusCode).toBe(201);
      });
    });
  });
