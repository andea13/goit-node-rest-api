import { isUserSubscriptionString } from "./isUserSubscriptionString";

//() - error - "subscription must exist"
//null - error - "subscription must exist"
//undefined  - error - "subscription must exist"
//false - error - "subscription must exist"
//true - error - "subscription must be a string"
//{} - error - "subscription must be a string"
//[] - error - "subscription must be a string"
//"pro" - true

describe("test user subscription type", () => {
  test("() - error - subscription must exist", () => {
    expect(() => isUserSubscriptionString()).toThrow("subscription must exist");
  });
  test("null - error - subscription must exist", () => {
    expect(() => isUserSubscriptionString(null)).toThrow(
      "subscription must exist"
    );
  });
  test("undefined -  error - subscription must exist", () => {
    expect(() => isUserSubscriptionString(undefined)).toThrow(
      "subscription must exist"
    );
  });
  test("false - error - subscription must exist", () => {
    expect(() => isUserSubscriptionString(false)).toThrow(
      "subscription must exist"
    );
  });
  test("true - error - subscription must be a string", () => {
    expect(() => isUserSubscriptionString(true)).toThrow(
      "subscription must be a string"
    );
  });

  test("number - subscription must be a string", () => {
    expect(() => isUserSubscriptionString(1303)).toThrow(
      "subscription must be a string"
    );
  });
  test("string - true", () => {
    const result = isUserSubscriptionString("pro");
    expect(result).toBe(true);
  });
});
