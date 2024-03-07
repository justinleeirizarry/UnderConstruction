import { Button } from "@/components/ui/button";

import { IconArrowRight } from "@/components/ui/icons";

const exampleMessages = [
  {
    heading: "Who is Justin Irizarry?",
    message: "Who is Justin Irizarry?",
  },
  {
    heading: "Does he have a dog?",
    message: "I want to see pictures of coco.",
  },
  {
    heading: "What languages does Justin know?",
    message: "What coding languages does Justin know?",
  },
  {
    heading: "Typescript Quiz?",
    message: "give me a quiz on Typescript?",
  },
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <h1 className="  pt-8 text-4xl font-black mb-4 ">
        Justin Irizarry{" "}
        <span className="text-xl text-muted-foreground ">is a</span>
      </h1>
      <h2 className=" lg:text-8xl md:text-8xl text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-2 lg:leading-[5rem] ">
        FullStack <br />
        Developer.
      </h2>

      <div className="rounded-3xl border  bg-background p-8 mb-4 sm:w-full">
        <p className="mb-2 leading-normal text-muted-foreground">
          This website is under construction. For now you can have a chat
        </p>

        <div className="mt-4 flex flex-col items-start space-y-2 mb-4 sm:text-center">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <IconArrowRight className="hidden sm:inline-flex mr-2 text-muted-foreground" />

              {message.heading}
            </Button>
          ))}

          <Button variant="link" className="h-auto p-0 text-base">
            <IconArrowRight className="hidden sm:inline-flex mr-2 text-muted-foreground" />
            <a
              target="_blank"
              href="https://resume.justinleeirizarry.com/"
              rel="noopener noreferrer"
            >
              Go straight to his resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
