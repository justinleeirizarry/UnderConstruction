import Link from "next/link";

import {
  IconGitHub,
  IconMessage,
  IconSeparator,
  IconShare,
  IconVercel,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-14 shrink-0 bg-background backdrop-blur-xl">
      <span className="inline-flex items-center home-links whitespace-nowrap">
        <IconVercel className="w-5 h-5 sm:h-6 sm:w-6" />

        <IconSeparator className="w-6 h-6 text-muted-foreground/20" />
        <Link href="/">
          <span className="text-lg font-bold">JI</span>
        </Link>
      </span>
      <div className="flex items-center justify-end space-x-2">
        <Button className="rounded-xl" asChild>
          <a
            target="_blank"
            href="https://resume.justinleeirizarry.com/"
            rel="noopener noreferrer"
          >
            <IconShare />
            <span className="hidden ml-2 md:flex text-md font-bold">
              Resume
            </span>
          </a>
        </Button>
        <Button className="rounded-xl" asChild>
          <a
            target="_blank"
            href="https://github.com/justinleeirizarry"
            rel="noopener noreferrer"
          >
            <IconGitHub />
            <span className="hidden ml-2 md:flex text-md font-bold">
              Github
            </span>
          </a>
        </Button>
        <Button className="rounded-xl" asChild>
          <a
            target="_blank"
            href="mailto:justinleeirizarry@gmail.com"
            rel="noopener noreferrer"
          >
            <IconMessage />
            <span className="hidden ml-2 md:flex text-md font-bold">
              Contact
            </span>
          </a>
        </Button>
      </div>
    </header>
  );
}
