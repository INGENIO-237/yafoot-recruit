import Link from "next/link";
import { Button } from "../ui/button";
import { IoIosCloudDownload } from "react-icons/io";

export default function PaymentSuccess() {
  const session = {
    _id: "sjkdjs9892893829skdlksa",
    date: "July 2024",
  };

  return (
    <div className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]">
      <div>
        <h1 className="text-3xl md:text-4xl text-secondary-hover font-bold">
          Paid 🎉
        </h1>
        <p className="text-white/60">
          You have successfully applied for the recruitment cohort that will
          place on{" "}
          <span className="text-secondary-hover font-bold">{session.date}</span>
          . Be next to your phone, our staff will contact you soon.
        </p>
        <p className="text-white/60 mt-2">
          Below is your participation card. Download it. You will need it to
          enter the recruitment center on the tests day.
        </p>
      </div>
      <Link href="#">
        <Button className="w-full mt-8 gap-2">
          <IoIosCloudDownload size={25} />
          <span>Download card</span>
        </Button>
      </Link>
    </div>
  );
}
