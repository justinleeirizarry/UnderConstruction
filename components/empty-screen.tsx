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
    heading: "What coding languages does Justin know?",
    message: "What coding languages does Justin know?",
  },
  {
    heading: "I want to answer questions about Typescript",
    message: "give me a test on Typescript?",
  },
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <h1 className="  pt-8 text-5xl font-black mb-4 ">
        Justin Irizarry{" "}
        <span className="text-xl text-muted-foreground ">is a</span>
      </h1>
      <h2 className=" text-[7.5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500  tracking-tight leading-[5.5rem]  mb-2 ">
        <span className="">FullStack</span> <br />
        <span className="">Developer.</span>
      </h2>
      <div className="rounded-3xl border  bg-background p-8 mb-4">
        <p className="mb-2 leading-normal text-muted-foreground">
          This website is under construction. For now you can have a chat
        </p>

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

          <Button variant="link" className="h-auto p-0 text-base">
            <IconArrowRight className="mr-2 text-muted-foreground" />
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
