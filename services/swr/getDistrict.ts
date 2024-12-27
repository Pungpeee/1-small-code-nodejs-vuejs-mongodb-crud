import useSWR from "swr/immutable";
import api from "..";

const GetDistrict = (id: number, key?: any) => {
  const fetcher = () => {
    return api.get.getDistrict(id);
  };
  const { data, error, mutate } = useSWR(`district${id}+${key}`, fetcher);
  if (error) {
    console.error("Error fetching data:", error);
  }
  return {
    data: data?.data,
    error,
    mutate,
  };
};
export default GetDistrict;
