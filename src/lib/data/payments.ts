import { useMutation } from "@tanstack/react-query";
import server from "../server";
import { PaymentData } from "@/components/payment/PaymentForm";
import { PROVIDER } from "../enums";
import { AxiosResponse } from "axios";

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

export function useInitiatePayment() {
  async function payApplicationFees(
    data: PaymentData & { provider: PROVIDER }
  ) {
    return server
      .post("/payments", data)
      .then(
        (
          response: AxiosResponse<{
            paymentRef: string;
            authorization_url: string;
            message: string;
          }>
        ) => {
          return response.data;
        }
      )
      .catch((error) => {
        throw error;
      });
  }

  const {
    mutateAsync: initiatePayment,
    data: pData,
    isSuccess: pSuccess,
    error: pError,
    isPending: pLoading,
  } = useMutation<
    {
      paymentRef: string;
      authorization_url: string;
      message: string;
    },
    any,
    {
      publicId: string;
      phone: string;
    } & {
      provider: PROVIDER;
    },
    unknown
  >({ mutationFn: payApplicationFees });

  return { initiatePayment, pData, pSuccess, pError, pLoading };
}
