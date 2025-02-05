import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerAgent } from "../actions";
import { SubmitButton } from "./submit-button";

export default function RegistrationForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Agent Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" action={registerAgent}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Developer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="developer.name">Name *</Label>
                <Input id="developer.name" name="developer.name" required />
              </div>
              <div>
                <Label htmlFor="developer.twitterHandle">Twitter Handle</Label>
                <Input
                  id="developer.twitterHandle"
                  name="developer.twitterHandle"
                  pattern="^@[\w_]{3,15}$"
                  title="Must be a valid Twitter handle starting with @ and containing 3-15 characters"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="developer.telegramHandle">
                Telegram Handle *
              </Label>
              <Input
                id="developer.telegramHandle"
                name="developer.telegramHandle"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Agent Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agent.name">Name *</Label>
                <Input id="agent.name" name="agent.name" required />
              </div>
              <div>
                <Label htmlFor="agent.primaryFunction">
                  Primary Function *
                </Label>
                <Input
                  id="agent.primaryFunction"
                  name="agent.primaryFunction"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="agent.description">Description</Label>
              <Input id="agent.description" name="agent.description" />
            </div>
            <div>
              <Label htmlFor="agent.ethWallet">ETH Wallet *</Label>
              <Input
                id="agent.ethWallet"
                name="agent.ethWallet"
                required
                pattern="^0x[0-9a-fA-F]{40}$"
                title="Must be a valid Ethereum wallet address"
              />
            </div>
            <div>
              <Label htmlFor="agent.twitterHandle">Twitter Handle</Label>
              <Input
                id="agent.twitterHandle"
                name="agent.twitterHandle"
                pattern="^@[\w_]{3,15}$"
                title="Must be a valid Twitter handle starting with @ and containing 3-15 characters"
              />
            </div>
            <div>
              <Label htmlFor="agent.tools">Tools (comma-separated)</Label>
              <Input id="agent.tools" name="agent.tools" />
            </div>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
