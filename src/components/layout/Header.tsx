import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="container py-5 lg:py-10 flex justify-between items-center">
      <Link href="/">
        <Image
          src="/images/yafoot-club.png"
          width={80}
          height={80}
          alt="yafoot-club"
          className="pointer-events-none"
        />
      </Link>
      <Link href="/apply">
        <Button>Register</Button>
      </Link>
    </nav>
  );
}
