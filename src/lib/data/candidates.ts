import { ApplicationData } from "@/components/apply/ApplicationForm";
import server from "../server";
import { useMutation } from "@tanstack/react-query";
import { CITIES, POSITIONS } from "../enums";
import { WaitlistData } from "@/components/payment/PaymentForm";

type RegisterCandidateData = ApplicationData & {
  city: string;
  position: string;
  clubs?: { start: number; end: number; name: string }[];
  strongFoot: string
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
    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("lastname", data.lastname);
    formData.append("phone", data.phone);
    formData.append("dob", data.dob);
    formData.append("pob", data.pob);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("practiceLevel", data.practiceLevel);
    formData.append("category", data.category);
    formData.append("city", data.city);
    formData.append("position", data.position);
    formData.append("strongFoot", data.strongFoot);
    if (data.firstname) {
      formData.append("firstname", data.firstname);
    }
    if (data.clubs) {
      formData.append("clubs", JSON.stringify(data.clubs));
    }
    
    return server
      .post("/candidates", formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
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
