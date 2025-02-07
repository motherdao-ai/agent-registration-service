import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            className="rounded-md"
            src="/MotherLogo.png"
            alt="Mother Dao in nature"
            width={32}
            height={32}
          />
        </Link>
        <Button asChild variant="default">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
};
