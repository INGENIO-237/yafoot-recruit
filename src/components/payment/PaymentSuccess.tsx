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
    reference &&
    cardUrl && (
      <div className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]">
        <div>
          <h1 className="text-3xl md:text-4xl text-secondary-hover font-bold">
            Paid 🎉
          </h1>
          <p className="text-white/60">
            You have successfully applied for the recruitment cohort that will
            take place on{" "}
            <span className="text-secondary-hover font-bold">
              {formatDate(session.date as string)}
            </span>
            . Be next to your phone, our staff will contact you soon.
          </p>
          <p className="text-white/60 mt-2">
            Below is your participation card. Download it. You will need it to
            enter the recruitment center on the tests day.
          </p>
        </div>
        {payment && psSuccess ? (
          <Link href={cardUrl} target="_blank">
            <Button className="w-full mt-8 gap-2">
              <IoIosCloudDownload size={25} />
              <span>Download card</span>
            </Button>
          </Link>
        ) : (
          <LoadingButton />
        )}
      </div>
    )
  );
}
