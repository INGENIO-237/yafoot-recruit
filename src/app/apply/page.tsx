"use client";

import ApplicationForm from "@/components/apply/ApplicationForm";
import SuccessView from "@/components/apply/SuccessView";
import { useState } from "react";

export default function Page() {
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className="container min-h-[90vh] flex justify-center items-start">
      {!isSuccess && <ApplicationForm setIsSuccess={setIsSuccess} />}
      {isSuccess && <SuccessView />}
    </div>
  );
}
