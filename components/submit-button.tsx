"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={"lg"}
      className={clsx([className, "rounded-full w-full"])}
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
