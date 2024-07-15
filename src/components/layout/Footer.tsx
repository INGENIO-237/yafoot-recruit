import Image from "next/image";
import Link from "next/link";
import { PiMapPinSimpleArea, PiPhone, PiMailbox } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="w-full min-h-[200px] border-t border-t-4 border-secondary-hover py-5 flex justify-center items-center">
      <div className="container max-w-[600px] flex flex-col items-center gap-5 md:flex-row md:justify-between md:items-center">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <Image
            src="/images/yafoot-club.png"
            width={80}
            height={80}
            alt="Logo"
          />
        </div>

        {/* Address, Contact & Socials */}
        <div className="space-y-2">
          {/* <Link href="#" className="flex items-center gap-3">
            <PiMapPinSimpleArea /> <span>https://yafoot-fc.com</span>
          </Link> */}
          <Link href="#" className="flex items-center gap-3">
            <PiMapPinSimpleArea /> <span>Yaoundé, Cameroun</span>
          </Link>
          <Link href="tel: +237 656 144 663" className="flex items-center gap-3">
            <PiPhone /> <span>+237 656 144 663</span>
          </Link>
          <Link href="mailto: john@doe.com" className="flex items-center gap-3">
            <PiMailbox /> <span>john@doe.com</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
