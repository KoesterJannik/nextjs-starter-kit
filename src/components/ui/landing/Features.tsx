import { HoverEffect } from "./card-hover-effect";

export function Features() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Stripe",
    description: "Setup payments to receive stripe payments in your app.",
    link: "https://stripe.com",
  },
  {
    title: "Shadcn",
    description: "Ready to use components you can easily customize.",
    link: "https://ui.shadcn.com/",
  },
  {
    title: "Auth.js",
    description: "OAuth or Magic Links, just provide your Secrets",
    link: "https://authjs.dev/",
  },
  {
    title: "Prisma",
    description:
      "Dead simple database client to connect to almost any database",
    link: "https://www.prisma.io/",
  },
  {
    title: "Emails",
    description: "Send emails with SES or bring your own SMTP",
    link: "https://aws.amazon.com/de/ses/",
  },
  {
    title: "Nextjs",
    description: "Meta React framework to build web apps",
    link: "https://nextjs.org/",
  },
];
