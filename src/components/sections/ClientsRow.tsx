import Image from "next/image";

const logos = [
  "/clients/logo1.svg",
  "/clients/logo2.svg",
  "/clients/logo3.svg",
];

export default function ClientsRow() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-80">
        {logos.map((src, i) => (
          <Image key={i} src={src} alt="Client logo" width={120} height={40} />
        ))}
      </div>
    </section>
  );
}

