import { ApplicationData } from "@/components/apply/ApplicationForm";
import server from "../server";
import { useMutation } from "@tanstack/react-query";
import { CITIES, POSITIONS } from "../enums";
import { WaitlistData } from "@/components/payment/PaymentForm";

type RegisterCandidateData = ApplicationData & {
  city: string;
  position: string;
};

export type ICandidate = {
  lastname: string;
  phone: string;
  publicId: string;
  firstname?: string | null | undefined;
  city: CITIES;
  position: POSITIONS;
};

export function useRegisterCandidate() {
  async function createCandidate(data: RegisterCandidateData) {
    return server
      .post("/candidates", data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  const {
    mutateAsync: registerCandidate,
    error,
    isSuccess,
    isPending: isLoading,
    data,
  } = useMutation<ICandidate, any, RegisterCandidateData, unknown>({
    mutationFn: createCandidate,
  });

  return { registerCandidate, error, isSuccess, isLoading, data };
}

export function useRegisterToWaitlist() {
  async function addToWaitlist({ publicId }: WaitlistData) {
    return server
      .post("/waitlist", { publicId })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  const {
    mutateAsync: registerToWaitlist,
    data,
    isPending,
    isSuccess,
    error,
  } = useMutation<any, any, WaitlistData, unknown>({
    mutationFn: addToWaitlist,
  });

  return { registerToWaitlist, data, isPending, isSuccess, error };
}
