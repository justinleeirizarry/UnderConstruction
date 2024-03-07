import React from "react";

import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "px-2 text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      Hallucinations can happen. Please contact me for actual answers{" "}
      <ExternalLink href="https://nextjs.org">Email</ExternalLink>
    </p>
  );
}
