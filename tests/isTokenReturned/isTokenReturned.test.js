import { checkToken } from "./isTokenReturned";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";

// dotenv.config();
// const { SECRET_KEY } = process.env;
// const { JWT_EXPIRES_IN } = process.env.JWT_EXPIRES_IN;
// const actualToken = jwt;

//2. Login returns token

// 4444 - false
// [555, andea] - false
//null - false
//undefined - false
//true - false
//false - false
//{} - false
//[] - false

//() - token must exist
//null - false - "token must be a string"
//undefined - false - "token must be a string"
//true - false - "token must be a string"
//false - false - "token must be a string"
//{} - false - "token must be a string"
//[] - false - "token must be a string"

describe("test login token", () => {
  it("() - error token must be returned", () => {
    expect(() => checkToken()).toThrow("token must be returned");
  });
});
