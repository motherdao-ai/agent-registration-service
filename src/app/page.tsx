import { Button } from "@/components/ui/button";
import Link from "next/link";
const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Mother DAO AI Agent Registration Service
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Welcome to the next generation of AI agent registration. Get started
          by registering your agent today.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/register" className="">
            <Button size="lg" variant="outline">
              Register Agent
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
