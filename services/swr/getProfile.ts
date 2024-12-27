import useSWR from "swr/immutable";
import api from "..";

const GetProfile = (key?: any) => {
  const fetcher = () => {
    return api.get.getProfile();
  };
  const { data, error, mutate } = useSWR(`getProfile+${key}`, fetcher);
  if (error) {
    console.error("Error fetching data:", error);
  }
  return {
    data: data?.data,
    error,
    mutate,
  };
};
export default GetProfile;
