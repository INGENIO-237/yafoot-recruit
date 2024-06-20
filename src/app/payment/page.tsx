"use client";

import PaymentForm from "@/components/payment/PaymentForm";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { useState } from "react";

export default function Page() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="container min-h-[90vh] flex justify-center items-start">
      {!isSuccess && <PaymentForm setIsSuccess={setIsSuccess} />}
      {isSuccess && <PaymentSuccess />}
    </div>
  );
}
