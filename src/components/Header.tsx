import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center">
          <Image
            className="rounded-md"
            src="/MotherLogo.png"
            alt="Logo"
            width={32}
            height={32}
          />
        </Link>

        {/* Register button on the right */}
        <Button asChild variant="default">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
