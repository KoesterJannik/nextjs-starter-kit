"use client";

import { useRouter } from "next/navigation";
import { TypewriterEffect } from "./typewriter-effect";

export function HeroSection() {
  const router = useRouter();
  const words = [
    {
      text: "The",
    },
    {
      text: "only",
    },
    {
      text: "Starter",
    },
    {
      text: "Kit",
    },
    {
      text: "you",
    },
    {
      text: "will",
    },
    {
      text: "ever",
    },
    {
      text: "need.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center py-20 ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        Next.js Starter Kit
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Check Repo
        </button>
        <button
          onClick={() => router.push("/sign-in")}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"
        >
          Checkout Demo
        </button>
      </div>
    </div>
  );
}
