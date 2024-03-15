export const checkToken = (token) => {
  if (!token) {
    throw new Error("token must be returned");
  }
};
