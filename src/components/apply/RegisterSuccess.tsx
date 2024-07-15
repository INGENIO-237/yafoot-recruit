import Link from "next/link";
import { Button } from "../ui/button";

export default function RegisterSuccess() {
  return (
    <div className="space-y-3 bg-gray-500/40 px-3 py-5 rounded backdrop-blur-lg w-full max-w-[500px]">
      <div>
        <h1 className="text-3xl md:text-4xl text-secondary-hover font-bold">
          Inscrit 🎉
        </h1>
        <p className="text-white/60 mt-3">
          Votre identifiant public est:{" "}
          <span className="text-secondary-hover font-bold">
            {localStorage.getItem("pk") || "YA-XXXX"}
          </span>
        </p>
        <p className="text-white/60">
          Vous en aurez besoin pour payer vos frais de participation. Il sera
          également utilisé pour vous identifier de manière unique lors de la
          journée des tests.
        </p>
      </div>
      <Link href="/payment">
        <Button className="w-full mt-8">Procéder au paiement</Button>
      </Link>
    </div>
  );
}
