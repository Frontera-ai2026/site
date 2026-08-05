import abbvieLogo from "@/assets/frontera/logos/abbvie.png";
import amgenLogo from "@/assets/frontera/logos/amgen.png";
import aptarLogo from "@/assets/frontera/logos/aptar.png";
import bavarianNordicLogo from "@/assets/frontera/logos/bavarian-nordic.png";
import boehringerIngelheimLogo from "@/assets/frontera/logos/boehringer-ingelheim.png";
import gskLogo from "@/assets/frontera/logos/gsk.png";
import menariniLogo from "@/assets/frontera/logos/menarini.png";
import nhsLogo from "@/assets/frontera/logos/nhs.svg";
import rocheLogo from "@/assets/frontera/logos/roche.png";
import ucbLogo from "@/assets/frontera/logos/ucb.png";

type Client = {
  name: string;
  logo?: string;
  logoClassName?: string;
};

const rowOne: Client[] = [
  { name: "AbbVie", logo: abbvieLogo, logoClassName: "h-7 md:h-9" },
  { name: "Amgen", logo: amgenLogo, logoClassName: "h-8 md:h-10" },
  { name: "Aptar", logo: aptarLogo, logoClassName: "h-8 md:h-10" },
  {
    name: "Bavarian Nordic",
    logo: bavarianNordicLogo,
    logoClassName: "h-11 md:h-14",
  },
  {
    name: "Boehringer Ingelheim",
    logo: boehringerIngelheimLogo,
    logoClassName: "h-9 md:h-12",
  },
  { name: "GSK", logo: gskLogo, logoClassName: "h-9 md:h-12" },
];

const rowTwo: Client[] = [
  { name: "Menarini", logo: menariniLogo, logoClassName: "h-8 md:h-10" },
  { name: "NHS", logo: nhsLogo, logoClassName: "h-8 md:h-10" },
  { name: "Roche", logo: rocheLogo, logoClassName: "h-10 md:h-12" },
  { name: "Stallergenes Greer" },
  { name: "UCB Pharma", logo: ucbLogo, logoClassName: "h-11 md:h-14" },
];

function ClientName({ client }: { client: Client }) {
  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        className={`client-logo w-auto shrink-0 ${client.logoClassName ?? "h-12"}`}
      />
    );
  }

  return (
    <span className="client-wordmark shrink-0 text-[clamp(1.8rem,3.6vw,3.4rem)] font-semibold leading-none text-[#c9c7cf]">
      {client.name}
    </span>
  );
}

function MarqueeRow({ clients, reverse = false }: { clients: Client[]; reverse?: boolean }) {
  const repeated = [...clients, ...clients];

  return (
    <div className="client-marquee-row overflow-hidden">
      <div
        className={`client-marquee-track flex w-max items-center gap-12 py-2.5 md:gap-20 ${
          reverse ? "client-marquee-reverse" : ""
        }`}
      >
        {repeated.map((client, index) => (
          <ClientName key={`${client.name}-${index}`} client={client} />
        ))}
      </div>
    </div>
  );
}

export function ClientStrip() {
  return (
    <section aria-label="Selected clients" className="border-y bg-background">
      <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-9 xl:px-0">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground md:mb-5">
          Experience with teams across
        </p>

        <div className="client-marquee">
          <MarqueeRow clients={rowOne} />
          <MarqueeRow clients={rowTwo} reverse />
        </div>
      </div>
    </section>
  );
}
