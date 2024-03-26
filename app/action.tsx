import "server-only";

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";
import OpenAI from "openai";

import { BotCard, BotMessage } from "@/components/llm-quiz/message";
import ImageComponent from "@/components/image";

import { Quiz } from "@/components/llm-quiz/quiz";
import { sleep, runOpenAICompletion } from "@/lib/utils";
import { z } from "zod";
import PreLoader from "@/components/loader";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className="items-center">
      <PreLoader />
    </BotMessage>
  );

  const completion = runOpenAICompletion(openai, {
    model: "gpt-4-turbo-preview",
    stream: true,
    messages: [
      {
        role: "system",
        content: `\

You are a helpful assistant. It's your job to discuss the full stack developer Justin Irizarry. Answer questions about his experiences as well as himself using the his the resume below. Only talk about his education if you are asked about it.

location: "Sydney, Australia",
  locationLink: "https://www.google.com/maps/place/sydney",
  about: "Full Stack Engineer",
  summary:
    "Experienced Full Stack Engineer with a proven track record in delivering high-performance web applications. Excels in collaborative environments, continuously adapts to emerging technologies, and committed to project excellence.",
  personalWebsiteUrl: "justinleeirizarry.com",
  contact: {
    email: "justinleeirizarry@gmail.com",
    tel: "+61405542310",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/justinleeirizarry",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/justin-irizarry/",
      },
      {
        name: "twitter",
        url: "https://twitter.com/justin_irizarry",
      },
    ],
  },
  education: [
    {
      school: "University of Nevada, Las Vegas ",
      degree: "MFA",
      start: "2010",
      end: "2013",
    },
    {
      school: "University of North Texas ",
      degree: "MA",
      start: "2010",
      end: "2008",
    },
    {
      school: "University of North Texas ",
      degree: "BA",
      start: "2003",
      end: "2007",
    },
  ],
  work: [
    {
      company: "Zable Health",
      title: "FullStack Developer",
      start: "2023",
      end: "2023",
      description:
        "• Led the refinement of the main booking system, focusing on enhancing accessibility and implementing responsive design principles on the frontend, alongside a comprehensive backend and database structure refactoring to support new changes. This holistic approach markedly improved user engagement and the overall user experience.\n" +
        "• Overhauled the search and filter functionality within the main booking system, significantly enhancing user navigability and efficiency in finding relevant options.\n" +
        "• Developed and deployed internal dashboards for real-time monitoring and data-driven decision-making, streamlining operational efficiency and team responsiveness.\n" +
        "• Instrumental in forging partnerships with external services, generating additional revenue streams and expanding the company's service offerings. This strategic move diversified our portfolio and opened new market opportunities.\n" +
        "• Engaged closely with the CEO and Product Manager, providing technical expertise and ensuring development initiatives aligned with organizational objectives and product strategies. This collaboration was crucial in steering project direction to meet strategic goals.\n" +
        "• Contributed to a collaborative hybrid work environment, effectively coordinating with cross-functional teams to achieve project milestones and ensure the timely delivery of high-quality solutions. My role facilitated seamless communication and integration of efforts across departments.\n" +
        "• Employed a diverse technology stack including AWS, NextJS, TypeScript, Express, PostgreSQL, and Styled Components to build robust, scalable solutions that catered to evolving business needs and user demands.\n" +
        "• Worked with a variety of technologies and tools including AWS (ECS instances, Secrets Manager, SQS) to support backend operations.",
    },
    {
      company: "Freelance FullStack Developer",
      title: "FullStack Developer",

      start: "2020",
      end: "2023",
      description:
        "• Delivered full-stack development solutions for small businesses and startups, employing a diverse array of modern technologies including JavaScript, CSS, Tailwind, React, TypeScript, Python, Flask, Django, Webpack, Babel, PHP, Wordpress, GCP, firebase, and AWS.\n" +
        "• Accelerated development timelines by harnessing no-code platforms and crafted intuitive, visually appealing user interfaces using advanced design tools like Figma and Adobe Illustrator.\n" +
        "• Prioritised adherence to accessibility standards and responsive design principles across various devices, enhancing user experience, and implemented SEO best practices, driving a notable increase in online visibility and traffic for client websites.\n" +
        "• Demonstrated strong communication skills to foster effective collaboration with clients and cross-functional teams.",
    },
    {
      company: "Netflix",
      title: "Data Analyst",

      start: "2015",
      end: "2017",
      description:
        "• Orchestrated the scheduling and maintenance of ETL processes, ensuring timely data availability for robust analysis.\n" +
        "• Fostered collaborative relationships with engineering teams, prioritising and efficiently resolving platform issues to enhance functionality.\n" +
        "• Leveraged skills in Data Visualisation and Python to drive actionable insights from complex data sets.\n" +
        "• Worked closely with cross-functional teams to identify and address data-related issues, significantly improving platform functionality and user experience.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "GraphQL",
    "REST",
    "Next.js",
    "CSS",
    "Tailwind",
    "Python",
    "Django",
    "Flask",
    "Webpack",
    "SQL",
    "AWS",
    "GCP",
    "Figma",
  ],

You and the user can discuss about different topics related to the technologies in justin's resume and the user can answer questions about them in the form of Test questions.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Tests are of topic = X]" means that an interface displays Test questions for a topic.
- "[User has selected Test answer = A]" means the user has clicked on answer a out of A, B, C, D as the answer to the Test.

- If the user requests a quiz on a specific CS of Justin topic, call \`show_quiz_questions\` to show the questions UI.
- If the user requests a picture of justins dog CoCo, call \`show_image\` to show images of coco. There are at least 4 images to call.



Don't make anything up and always use the resume data when questions are about justin. Do not provide links, simply text.
Keep a conversation tone. 



`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: "show_image",
        description: "show use image of justins dog.",
        parameters: z.object({
          image: z.array(
            z.object({
              coco: z.string().describe("picture of justins dog coco"),
            })
          ),
        }),
      },

      {
        name: "show_quiz_questions",
        description:
          "Show Test question for a specific topic. Use this to show four Test questions to the user.",
        parameters: z.object({
          topic: z.string().describe("The name of the topic"),
          question: z
            .array(z.string())
            .max(1)
            .describe(
              "The question about the specific topic to show to the user. It has to be difficult complexity."
            ),
          options: z
            .array(
              z.object({
                id: z.string().describe("The id of the option. Eg, A, B, C, D"),
                value: z
                  .string()
                  .describe(
                    "The possible option for the question to show to the user. "
                  ),
              })
            )
            .max(4)
            .describe(
              "The possible options for the question to show to the user."
            ),
          answer: z
            .array(z.string())
            .max(1)
            .describe("The answers to the questions. Eg, A"),
        }),
      },
    ],
    temperature: 0.7,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: "assistant", content }]);
    }
  });

  completion.onFunctionCall("show_image", async () => {
    reply.update(
      <BotCard>
        <PreLoader />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <ImageComponent />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: "function",
        name: "show_image",
        content: `[image of justins dog coco]`,
      },
    ]);
  });

  completion.onFunctionCall(
    "show_quiz_questions",
    async ({ topic, question, options, answer }) => {
      reply.update(
        <BotCard>
          <PreLoader />
        </BotCard>
      );

      await sleep(1000);

      reply.done(
        <BotCard>
          <Quiz
            topic={topic}
            question={question[0]}
            options={options}
            answer={answer[0]}
          />
        </BotCard>
      );

      aiState.done([
        ...aiState.get(),
        {
          role: "function",
          name: "show_quiz_questions",
          content: `[UI for topic ${topic} for the question ${question} with Test options 
          ${options} and the answer, ${answer}
        ]`,
        },
      ]);
    }
  );

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// Define necessary types and create the AI.

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
