"use client";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "outline",
  className,
  onClick = () => {},
}: {
  children: ReactNode;
  variant?: "outline" | "default";
  className?: string;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();

  const buttonVariants = cva("rounded-lg w-full font-mono", {
    variants: {
      variant: {
        default: "bg-indigo-900 shadow-indigo-500",
        outline: "shadow-3xl border border-indigo-500",
      },
    },
  });
  return (
    <Button
      type="submit"
      size={"lg"}
      variant={variant}
      className={clsx([
        buttonVariants({ variant }),
        pending && "shadow-none",
        className,
      ])}
      disabled={pending}
      onClick={onClick}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!pending && children}
    </Button>
  );
}
