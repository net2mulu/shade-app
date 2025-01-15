export const customHandleError = (err, toast) => {
  console.log(err)
  if (err.graphQLErrors?.length > 0) {

    const graphQLError = err.graphQLErrors[0];

    if (graphQLError.message === "INVALID_CREDENTIALS") {
      toast && toast.error("Incorrect email or password!");
    } else if (graphQLError.message === "CANT_FIND_USER_ACCESS_DENIED") {
      toast && toast.error("User not found.");
    } else  {
      toast && toast.error(graphQLError.message);
    }
  } 
  
  else if (err.networkError) {
    toast && toast.error("Network error occurred. Please try again.");
  } else {
    toast && toast.error("An unexpected error occurred.");
  }
};
