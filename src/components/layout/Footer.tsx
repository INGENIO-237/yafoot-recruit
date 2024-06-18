import Image from "next/image";
import Link from "next/link";
import { PiMapPinSimpleArea, PiPhone, PiMailbox } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="w-full min-h-[200px] bg-y_red/20 py-5">
      <div className="container">
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
        <div>
          <Link href="#" className="flex items-center gap-3">
            <PiMapPinSimpleArea /> <span>Yaounde, Cameroon</span>
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
