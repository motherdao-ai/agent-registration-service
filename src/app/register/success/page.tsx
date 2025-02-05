import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <CardTitle className="text-2xl font-bold text-center">
            Agent Registered!
          </CardTitle>
          <CardDescription className="text-center">
            Your agent has been successfully registered on the network.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            The agent and developer information have been recorded. Your agent
            is now ready to be discovered and utilized on the network.
          </p>
          <Button className="mt-4" variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
