import React from "react";
import { Button } from "@/components/ui/button";
import { SignIn } from "../components/ui/auth/sign-in";
import { SparklesHeading } from "../components/ui/landing/Sparkling";
import { HeroSection } from "../components/ui/landing/Hero";
import { Features } from "../components/ui/landing/Features";
import { FaDiscord, FaGithub } from "react-icons/fa"; // Import the Discord and GitHub icons

type Props = {};

function Page({}: Props) {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen">
      <div className="absolute top-4 right-4 flex space-x-4">
        <a
          href="https://discord.gg/FuNskDVvhd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition duration-200"
        >
          <FaDiscord size={30} />
        </a>
        <a
          href="https://github.com/KoesterJannik/nextjs-starter-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-600 transition duration-200"
        >
          <FaGithub size={30} />
        </a>
      </div>
      <HeroSection />
      <Features />
    </div>
  );
}

export default Page;
