export const checkUserType = (user) => {
  if (!user) {
    throw new Error("user must be returned");
  }

  if (typeof user !== "object" || Array.isArray(user)) {
    throw new Error("user must be an object");
  }

  return typeof user === "object" && user !== null;
};
