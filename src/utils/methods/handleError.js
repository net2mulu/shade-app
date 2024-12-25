export const customHandleError = (err, toast) => {
  if (err.graphQLErrors?.length > 0) {
    const graphQLError = err.graphQLErrors[0];

    if (graphQLError.message === "INVALID_CREDENTIALS") {
      toast && toast.error("Incorrect email or password!");
    } else if (graphQLError.message === "CANT_FIND_USER_ACCESS_DENIED") {
      toast && toast.error("User not found.");
    } else {
      toast && toast.error("Something went wrong");
    }
  } else if (err.networkError) {
    toast && toast.error("Network error occurred. Please try again.");
  } else {
    toast && toast.error("An unexpected error occurred.");
  }
};
