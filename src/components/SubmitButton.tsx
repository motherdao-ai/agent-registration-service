"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { SubmitButtonProps } from "@/app/types";

export const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <div
            className={
              className
                ? className
                : `mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white`
            }
          />
          Registering...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
