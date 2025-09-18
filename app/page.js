"use client";

import Section1 from "@/features/home/components/Section1";
import Section2 from "@/features/home/components/Section2";
import Section3 from "@/features/home/components/Section3";
import Section4 from "@/features/home/components/Section4";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/operation");
    }
  }, [session, router]); // ✅ redirect only if session exists

  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}
