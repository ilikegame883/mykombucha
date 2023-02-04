import useSWR from "swr";

const useUser = (userId: string) => {
  const { data, error } = useSWR(`/api/users/${userId}`);
  return {
    user: data,
    isError: error,
  };
};

export { useUser };
