import request from "supertest";
import { app } from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT = 3000 } = process.env;

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("post /api/users/login - tests whether login successful", () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "oksana.dziuba@gmail.com",
        password: "123456",
      })

      .expect("Content-Type", /json/)

      .expect(200)

      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            token: expect.any(String),
            user: expect.objectContaining({
              email: expect.any(String),

              subscription: expect.any(String),
            }),
          })
        );
      });
  }, 5000);
});
