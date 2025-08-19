
import BlackDiv from "@/components/BlackDiv";
export default function AboutLayout({ children }) {
  return (
    <>
    <section className="min-h-[80vh] flex flex-col items-center justify-center">
      <BlackDiv/>
      {children}
    </section>
    </>
  );
}

