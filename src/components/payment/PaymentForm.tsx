"use client";

import { useForm } from "react-hook-form";
import { object, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PAYMENT_STATUS, PROVIDER } from "@/lib/enums";
import Image from "next/image";
import { useRegisterToWaitlist } from "@/lib/data/candidates";
import LoadingButton from "../ui/Loading";
import {
  ISession,
  useGetLatestSession,
  useGetPayment,
  useInitiatePayment,
} from "@/lib/data/payments";
import { formatDate } from "@/lib/utils";

const PaymentSchema = object({
  publicId: string({
    required_error: "Veuillez fournir votre identifiant public",
  })
    .min(4, "Trop court : l'identifiant public doit comporter 4 caractères.")
    .max(
      4,
      "Trop long : l'identifiant public ne peut pas dépasser 4 caractères."
    ),
  phone: string({
    required_error: "Le numéro de téléphone est requis",
    invalid_type_error: "Numéro de téléphone invalide",
  }),
});

export type PaymentData = z.infer<typeof PaymentSchema>;

const WaitlistSchema = object({
  publicId: string({
    required_error: "Veuillez fournir votre identifiant public",
  }),
});

export type WaitlistData = z.infer<typeof WaitlistSchema>;

export default function PaymentForm({
  setIsSuccess,
}: {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}) {
  // Handle provider
  const providers = [
    { image: "/images/momo.png", value: PROVIDER.MOMO },
    { image: "/images/om.png", value: PROVIDER.OM },
  ];
  const [provider, setProvider] = useState(providers[0].value);
  // End Handle provider

  /**
   * RECRUITMENT SESSION =======================>
   */
  const [recruitmentSession, setRecruitmentSession] = useState<
    ISession | undefined
  >(undefined);
  const { getLatestSession, sSuccess, sData, sLoading, sError } =
    useGetLatestSession();

  useEffect(() => {
    if (!recruitmentSession) {
      getLatestSession();
    }

    if (!recruitmentSession && sSuccess && sData) {
      localStorage.setItem(
        "session",
        JSON.stringify({ ...sData, date: formatDate(sData.date) })
      );
      setRecruitmentSession({ ...sData, date: formatDate(sData.date) });
    }
  }, [getLatestSession, sData, sError, sSuccess, recruitmentSession]);
  /**
   * <======================= RECRUITMENT SESSION
   */

  /**
   * PAYMENT =======================>
   */
  const [reference, setReference] = useState<string | undefined>(undefined);
  const [isFetchingPaymentStatus, setIsFetchingPaymentStatus] = useState(false);
  const { initiatePayment, pData, pError, pLoading, pSuccess } =
    useInitiatePayment();

  useEffect(() => {
    if (pSuccess && pData && !reference) {
      const { message, paymentRef, authorization_url } = pData;

      setReference(paymentRef);
      toast.success(message, { autoClose: false });
    }

    if (pError) {
      const errors = pError?.response?.data;

      if (errors) {
        errors.map((err: any) => toast.error(err.message));
      }
    }
  }, [pData, pError, pSuccess, reference]);

  // Constantly check for payment status
  const { getPayment } = useGetPayment();

  useEffect(() => {
    if (reference) {
      let timeout = 1000 * 60 * 10; // 10 minutes
      const TIME_INTERVAL = 30000; // 30 secondes
      let exit = false;

      setIsFetchingPaymentStatus(true);
      const interval = setInterval(async (): Promise<void> => {
        timeout -= TIME_INTERVAL;

        try {
          const { status } = await getPayment(reference as string);
          if (
            Object.values(PAYMENT_STATUS).includes(status as PAYMENT_STATUS) &&
            status != PAYMENT_STATUS.INITIALIZED
          ) {
            exit = true;
            setIsFetchingPaymentStatus(false);
          }

          // Payment succeeded, behave accordingly
          if (status == PAYMENT_STATUS.SUCCEEDED) {
            localStorage.setItem("reference", reference);
            toast.success("Paiement effectué avec succès.");
            setTimeout(() => setIsSuccess(true), 1500);
          }

          if (exit && status != PAYMENT_STATUS.SUCCEEDED)
            toast.error("Paiement échoué");

          if (timeout < 1 || exit) {
            setIsFetchingPaymentStatus(false);
            clearInterval(interval);
          }
        } catch (error) {
          setIsFetchingPaymentStatus(false);
          console.log(error);
          toast.error(
            "Échec de la vérification du statut du paiement. Contactez le support et signalez le problème s'il vous plaît."
          );
        }
      }, TIME_INTERVAL);
    }
  }, [getPayment, reference, setIsSuccess]);

  const form = useForm<PaymentData>({
    resolver: zodResolver(PaymentSchema),
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: PaymentData) {
    const errors = [];

    if (!isValidPhoneNumber(data.phone))
      errors.push("Numéro de téléphone invalide");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      // Send data to backend
      const payload = {
        ...data,
        provider,
        session: recruitmentSession?._id.toString() as string,
      };

      await initiatePayment(payload);
    }
  }
  /**
   * <======================= PAYMENT
   */

  /**
   * WAITLIST =======================>
   */
  const {
    registerToWaitlist,
    data: wData,
    isPending: wPending,
    isSuccess: wSuccess,
    error: wError,
  } = useRegisterToWaitlist();

  useEffect(() => {
    if (wSuccess && wData) {
      toast.success("Ajouté à la liste d'attente.");
    }

    if (wError) {
      const errors = wError?.response?.data;

      if (errors) {
        errors.map((err: any) => toast.error(err.message));
      }
    }
  }, [wSuccess, wData, wError]);

  // Show waitlist form in case no recruitment recruitmentSession available
  const waitlistForm = useForm<WaitlistData>({
    resolver: zodResolver(WaitlistSchema),
  });

  const { control: waitlistControl, handleSubmit: handleWaitlistSubmit } =
    waitlistForm;

  async function onSubmitWaitlist(data: WaitlistData) {
    // Send data to backend
    await registerToWaitlist(data);
  }
  /**
   * <======================= WAITLIST
   */

  return (
    <Form {...form}>
      {recruitmentSession && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]"
        >
          <div>
            <h1 className="text-3xl md:text-4xl">
              Juste à un pas de{" "}
              <span className="text-secondary-hover font-bold">votre rêve</span>
            </h1>
            <p className="text-white/60">
              Vous êtes sur le point de payer{" "}
              <span className="text-secondary-hover font-bold">
                10.000 FCFA
              </span>{" "}
              pour participer à la session de recrutement du{" "}
              <span className="text-secondary-hover font-bold capitalize">
                {recruitmentSession.date as string}
              </span>
            </p>
          </div>
          <FormField
            control={control}
            name="publicId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  ID public
                </FormLabel>
                <div className="flex gap-3 items-center">
                  <span className="text-xl">YA-</span>
                  <FormControl>
                    <Input
                      placeholder="Votre identifiant public"
                      className="text-black"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <RadioGroup defaultValue={PROVIDER.MOMO} className="flex">
            {providers.map((provider, index) => {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={provider.value}
                    id={provider.value}
                    className="text-white border-white"
                    onClick={(e: any) => {
                      setProvider(e.target.value as PROVIDER);
                    }}
                  />
                  <Label htmlFor={provider.value}>
                    <Image
                      src={provider.image}
                      width={70}
                      height={70}
                      alt={provider.value}
                    />
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  Numéro de téléphone
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Entrez le numéro de téléphone"
                    {...field}
                    // className="px-3 py-2 text-black w-full"
                    numberInputProps={{
                      className:
                        " w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 text-black",
                    }}
                    defaultCountry="CM"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Link href="/apply" className="text-secondary-hover">
              Pas encore inscrit
            </Link>
            {pLoading || isFetchingPaymentStatus ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Payer</Button>
            )}
          </div>
        </form>
      )}
      {!recruitmentSession && (
        <form
          onSubmit={handleWaitlistSubmit(onSubmitWaitlist)}
          className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]"
        >
          <div>
            <h1 className="text-3xl md:text-4xl">
              Aucune session de recrutement disponible pour le moment.{" "}
              <span className="text-secondary-hover font-bold">
                Rejoignez la liste d&rsquo;attente
              </span>
              .
            </h1>
            <p className="text-white/60">
              Inscrivez-vous sur la liste d&rsquo;attente pour être averti dès
              qu&rsquo;il y a une nouvelle session de recrutement disponible
            </p>
          </div>
          <FormField
            control={waitlistControl}
            name="publicId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium capitalize">
                  ID Public
                </FormLabel>
                <div className="flex gap-3 items-center">
                  <span className="text-xl">YA-</span>
                  <FormControl>
                    <Input
                      placeholder="Your public ID"
                      className="text-black"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Link href="/apply" className="text-secondary-hover">
              Pas encore inscrit
            </Link>
            {wPending ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Rejoindre</Button>
            )}
          </div>
        </form>
      )}
    </Form>
  );
}
