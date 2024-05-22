import React from "react";
import { Button } from "@/components/ui/button";
import { SignIn } from "../components/ui/auth/sign-in";
import { SparklesHeading } from "../components/ui/landing/Sparkling";
import { HeroSection } from "../components/ui/landing/Hero";
import { Features } from "../components/ui/landing/Features";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <HeroSection />
      <Features />
    </div>
  );
}

export default page;
