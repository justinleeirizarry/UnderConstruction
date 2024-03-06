import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { IconArrowRight } from "@/components/ui/icons";
import Preloader from "./loader";

const exampleMessages = [
  {
    heading: "Who is Justin Irizarry?",
    message: "Who is Justin Irizarry?",
  },
  {
    heading: "What coding languages does Justin know?",
    message: "What coding languages does Justin know?",
  },
  {
    heading: "I want to learn about Typescript?",
    message: "give me a test about Typescript?",
  },
  {
    heading: "Does he have a dog?",
    message: "I want to see pictures of coco?",
  },
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8 mb-4">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome Justin Irizarry's website.
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is a demo of an interactive website to discuss Justin.
          Hallucinations can happen, please see the actual resume. This website
          is under construction.
        </p>

        <p className="leading-normal text-muted-foreground">Try an example:</p>
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
