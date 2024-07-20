"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { IoIosCloudDownload } from "react-icons/io";
import { ISession, useGetPayment } from "@/lib/data/payments";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import LoadingButton from "../ui/Loading";

export default function PaymentSuccess() {
  const session = JSON.parse(
    localStorage.getItem("session") as string
  ) as ISession;
  const [reference] = useState(localStorage.getItem("reference"));
  const { getPayment, psLoading, psSuccess, payment } = useGetPayment();
  const [cardUrl, setCardUrl] = useState("");

  useEffect(() => {
    if (reference && !payment) getPayment(reference);

    if (psSuccess && payment) setCardUrl(payment.card);
  }, [getPayment, payment, psSuccess, reference]);

  return (
    <div className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]">
      <div>
        <h1 className="text-3xl md:text-4xl text-secondary-hover font-bold">
          Payé 🎉
        </h1>
        <p className="text-white/60">
          Vous vous êtes inscrit(e) avec succès à la cohorte de recrutement qui
          aura lieu aura lieu le{" "}
          <span className="text-secondary-hover font-bold">
            {formatDate(session.date as string)}
          </span>
          . Restez près de votre téléphone, notre personnel vous contactera
          bientôt.
        </p>
        <p className="text-white/60 mt-2">
          Vous trouverez ci-dessous votre carte de participation.
          Téléchargez-la. Vous en aurez besoin pour entrer dans le centre de
          recrutement le jour des tests.
        </p>
      </div>
      {payment && psSuccess && cardUrl ? (
        <Link href={cardUrl} target="_blank">
          <Button className="w-full mt-8 gap-2">
            <IoIosCloudDownload size={25} />
            <span>Télécharger la carte</span>
          </Button>
        </Link>
      ) : (
        <LoadingButton />
      )}
    </div>
  );
}
