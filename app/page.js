"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";

import {
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/operation");
    }
  }, [isSignedIn, router]);

  return (
    <>
      <SignedOut>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </SignedOut>
    </>
  );
}
