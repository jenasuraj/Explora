"use client"

import Section1 from "@/features/home/components/Section1";
import Section2 from "@/features/home/components/Section2";
import Section3 from "@/features/home/components/Section3";
import Section4 from "@/features/home/components/Section4";

// Mark the component as async to use await
export default  function Home() {

  return (
    <>

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}
