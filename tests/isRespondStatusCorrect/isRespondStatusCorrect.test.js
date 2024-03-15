import { getRespondStatus } from "./isRespondStatusCorrect";

//1. Login returns 200 status code when successful
//200 - true
//201 - false

describe("test login respond status", () => {
  it("200 - true", () => {
    const res = {
      status: 200,
    };
    const result = getRespondStatus(res);
    expect(result).toBe(200);
  });
  it("201 - false", () => {
    const res = {
      status: 201,
    };
    const result = getRespondStatus(res);
    expect(result).toBe(201);
  });
});
