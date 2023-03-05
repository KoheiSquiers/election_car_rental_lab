import { useQuery } from "@tanstack/react-query";
import useFetch from "../fech/use-fetch";

export const useGetZipAddress = (zipcode: string) => {
  const uFetch = useFetch();

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["getZipAddress", zipcode],
    async () => {
      const query_params = new URLSearchParams({
        zipcode: zipcode,
      });
      return await uFetch(
        `https://zipcloud.ibsnet.co.jp/api/search?${query_params}`,
        "GET",
      );
    },
    {
      keepPreviousData: true,
      enabled: !!zipcode,
    },
  );
  if (isLoading && isError) {
    return null;
  }
  if (isSuccess) {
    return data;
  }
};
