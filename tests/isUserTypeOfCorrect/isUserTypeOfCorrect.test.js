import { checkUserType } from "./isUserTypeOfCorrect";

//()- error - "user must be returned"
//null - error - "user must be returned"
//undefined - error - "user must be returned"
//false - error - "user must be returned"
//true - error - "user must be an object"
//"andea13" - error - "user must be an object
//1303 - error - "user must be an object"
//[] - error - "user must be an object"
// user = {
//       email: "andea13@gmail.com",
//       subscription: "starter",
//     } - true

describe("test user type", () => {
  test("() - error user must be returned", () => {
    expect(() => checkUserType()).toThrow("user must be returned");
  });
  test("null - user must be returned", () => {
    expect(() => checkUserType(null)).toThrow("user must be returned");
  });
  test("undefined -  user must be returned", () => {
    expect(() => checkUserType(undefined)).toThrow("user must be returned");
  });
  test("false - user must be returned", () => {
    expect(() => checkUserType(false)).toThrow("user must be returned");
  });
  test("true - error user must be an object", () => {
    expect(() => checkUserType(true)).toThrow("user must be an object");
  });

  test("string - error user must be an object", () => {
    expect(() => checkUserType("andea13")).toThrow("user must be an object");
  });
  test("number - error user must be an object", () => {
    expect(() => checkUserType(1303)).toThrow("user must be an object");
  });
  test("array - error user must be an object", () => {
    expect(() => checkUserType([])).toThrow("user must be an object");
  });

  test("object with email and subscription - true", () => {
    const user = {
      email: "andea13@gmail.com",
      subscription: "starter",
    };
    const result = checkUserType(user);
    expect(result).toBe(true);
  });
});
