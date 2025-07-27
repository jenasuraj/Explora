import Section1 from "@/components/home/Section1"
import Section2 from "@/components/home/Section2"
import Section3 from "@/components/home/Section3"
import Section4 from "@/components/home/Section4"


export const metadata = {
  title: "Explora.ai - Smart Travel Destination Picker",
  description: "Let our smartest AI pick your perfect destination and experience travel the smarter way with Explora.ai.",
  keywords: ["AI travel", "smart travel", "travel destination", "Expora.ai", "travel planning"],
  authors: [{ name: "Explora.ai Team" }],
};

export default function Home() {
  return (
    <>
<Section1/> 
<Section2/>
<Section3/>
<Section4/>
    </>
  );
}
