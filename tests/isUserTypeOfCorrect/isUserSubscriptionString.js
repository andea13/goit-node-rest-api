export const isUserSubscriptionString = (subscription) => {
  if (!subscription) {
    throw new Error("subscription must exist");
  }
  if (typeof subscription !== "string" || Array.isArray(subscription)) {
    throw new Error("subscription must be a string");
  }

  return typeof subscription === "string";
};
