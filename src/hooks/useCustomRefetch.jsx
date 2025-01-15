import { useState } from "react";

const useCustomRefetch = (refetchFunction) => {
  const [isRefetching, setIsRefetching] = useState(false);
  const [refetchError, setRefetchError] = useState(null);

  const handleRefetch = async () => {
    try {
      setIsRefetching(true);
      setRefetchError(null);
      await refetchFunction();
    } catch (error) {
      console.error("Refetch failed:", error);
      setRefetchError(error);
    } finally {
      setIsRefetching(false);
    }
  };

  return { handleRefetch, isRefetching, refetchError };
};

export default useCustomRefetch;
