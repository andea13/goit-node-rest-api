export const isUserEmailString = (email) => {
  if (!email) {
    throw new Error("email must exist");
  }
  if (typeof email !== "string" || Array.isArray(email)) {
    throw new Error("email must be a string");
  }

  return typeof email === "string";
};
