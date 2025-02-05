export type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export type AgentRegistrationFormData = {
  developer: {
    name: string;
    twitterHandle: string;
    telegramHandle: string;
  };
  agent: {
    name: string;
    description: string;
    primaryFunction: string;
    ethWallet: string;
    twitterHandle: string;
    tools: string[];
  };
};
