import useSWR from "swr/immutable";
import api from "..";

const GetSubDistrict = (id: number, key?: any) => {
  const fetcher = () => {
    return api.get.getSubDistrict(id);
  };
  const { data, error, mutate } = useSWR(`subdistrict${id}+${key}`, fetcher);
  if (error) {
    console.error("Error fetching data:", error);
  }
  return {
    data: data?.data,
    error,
    mutate,
  };
};
export default GetSubDistrict;
