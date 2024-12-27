import useSWR from "swr/immutable";
import api from "..";

const GetProvince = (id: number, key?: any) => {
  const fetcher = () => {
    return api.get.getProvince(id);
  };
  const { data, error, mutate } = useSWR(`province${id}+${key}`, fetcher);
  if (error) {
    console.error("Error fetching data:", error);
  }
  return {
    data: data?.data,
    error,
    mutate,
  };
};
export default GetProvince;
