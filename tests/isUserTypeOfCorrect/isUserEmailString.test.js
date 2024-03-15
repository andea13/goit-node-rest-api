import { isUserEmailString } from "./isUserEmailString";

//() - error - "email must exist"
//null - error - "email must exist"
//undefined  - error - "email must exist"
//false - error - "email must exist"
//true - error - "email must be a string"
//{} - error - "email must be a string"
//[] - error - "email must be a string"
//"andea13" - true

describe("test user email type", () => {
  test("() - error email must exist", () => {
    expect(() => isUserEmailString()).toThrow("email must exist");
  });
  test("null - error email must exist", () => {
    expect(() => isUserEmailString(null)).toThrow("email must exist");
  });
  test("undefined -  error email must exist", () => {
    expect(() => isUserEmailString(undefined)).toThrow("email must exist");
  });
  test("false - error email must exist", () => {
    expect(() => isUserEmailString(false)).toThrow("email must exist");
  });
  test("true - error email must be a string", () => {
    expect(() => isUserEmailString(true)).toThrow("email must be a string");
  });

  test("number - email must be a string", () => {
    expect(() => isUserEmailString(1303)).toThrow("email must be a string");
  });
  test("string - true", () => {
    const result = isUserEmailString("andea13");
    expect(result).toBe(true);
  });
});
