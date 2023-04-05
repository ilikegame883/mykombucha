import { useMemo } from "react";
import useSWR from "swr";
import useDebounce from "./useDebounce";

//Hero search bar
export const useSearchData = (searchValue) => {
  const debouncedValue = useDebounce(searchValue, 250);

  const {
    data: combinedData,
    error,
    isValidating,
  } = useSWR(debouncedValue ? `/api/search/combined/${debouncedValue}` : null);

  const kombuchaSearchData = combinedData?.kombucha;
  const brewerySearchData = combinedData?.brewery;

  const searchData = useMemo(() => {
    if (kombuchaSearchData && brewerySearchData) {
      return [...kombuchaSearchData, ...brewerySearchData];
    }
    return [];
  }, [kombuchaSearchData, brewerySearchData]);

  return { searchData, error, isLoading: isValidating };
};
