import Link from "next/link";
import { Button } from "../ui/button";

export default function SuccessView() {
  return (
    <div className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]">
      <div>
        <h1 className="text-3xl md:text-4xl text-secondary-hover font-bold">
          Registered 🎉
        </h1>
        <p className="text-white/60 mt-3">
          Your public ID is:{" "}
          <span className="text-secondary-hover font-bold">YA-078</span>
        </p>
        <p className="text-white/60">
          You will need it pay your participation fees. Also, it will be used to
          uniquely identify you during the tests day.
        </p>

      </div>
        <Link href="/payment">
          <Button className="w-full mt-8">Proceed to payment</Button>
        </Link>
    </div>
  );
}
