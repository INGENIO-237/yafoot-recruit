import { useMutation } from "@tanstack/react-query";
import server from "../server";

export type ISession = {
  _id: string;
  date: Date | string;
};

export function useGetLatestSession() {
  async function fetchLatestSession() {
    return server
      .get("/sessions/latest")
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  const {
    mutateAsync: getLatestSession,
    data: sData,
    isSuccess: sSuccess,
    isPending: sLoading,
    error: sError,
  } = useMutation<ISession, any>({ mutationFn: fetchLatestSession });

  return { getLatestSession, sData, sSuccess, sLoading, sError };
}
