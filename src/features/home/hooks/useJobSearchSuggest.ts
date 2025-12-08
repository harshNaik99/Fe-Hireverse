import { useQuery } from "@tanstack/react-query";
import { fetchSearchSuggest } from "../../../api/jobs.api";

export const useJobSearchSuggest = (query: string) =>
  useQuery({
    queryKey: ["search-suggest", query],
    queryFn: () => fetchSearchSuggest(query),
    enabled: query.length >= 2, // prevent useless calls
    staleTime: 1000 * 60 * 10,
  });
