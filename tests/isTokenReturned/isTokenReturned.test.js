import { checkToken } from "./isTokenReturned";

//() - token must exist
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//.eyJpZCI6IjY1ZDZlYzI4OWQ5Yzc0Y2U4MDVlODlmMCIsImlhdCI6MTcwOTI4Mjc1OSwiZXhwIjoxNzA5MzY1NTU5fQ
//.fa32FfeWHScwx_I9Bbh_8IEFxDreEaikF2LxERxhdqE - true;

describe("test login token", () => {
  it("() - error token must be returned", () => {
    expect(() => checkToken()).toThrow("token must be returned");
  });
  it("actual token - true", () => {
    const result = checkToken(
      " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDZlYzI4OWQ5Yzc0Y2U4MDVlODlmMCIsImlhdCI6MTcwOTI4Mjc1OSwiZXhwIjoxNzA5MzY1NTU5fQ.fa32FfeWHScwx_I9Bbh_8IEFxDreEaikF2LxERxhdqE"
    );
    expect(result).toBe(true);
  });
});
