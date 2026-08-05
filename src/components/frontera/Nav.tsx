import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FLogo } from "./FLogo";

export const bookingUrl =
  "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled";

const hashLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Offer" },
  { id: "method", label: "Method" },
  { id: "work", label: "Proof" },
  { id: "deliverables", label: "Capabilities" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }

    const sections = hashLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -58% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-[0_12px_40px_rgba(18,23,27,0.08)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 xl:px-0">
        <Link to="/" className="group flex items-center gap-3" aria-label="Frontera Global home">
          <FLogo className="transition-colors group-hover:border-accent group-hover:text-accent" />
          <span className="hidden text-sm font-semibold tracking-[0.18em] text-foreground sm:inline">
            FRONTERA GLOBAL
          </span>
        </Link>

        <ul className="hidden items-center gap-7 text-[13px] lg:flex">
          {hashLinks.map((l) => (
            <li key={l.label}>
              <a
                href={onHome ? `#${l.id}` : `/#${l.id}`}
                className={`transition-colors hover:text-accent ${
                  active === l.id ? "text-foreground" : "text-foreground/58"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/reference-article"
              className="text-foreground/45 transition-colors hover:text-accent"
              activeProps={{ className: "text-foreground transition-colors hover:text-accent" }}
            >
              Article
            </Link>
          </li>
        </ul>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center border border-foreground bg-foreground px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:border-accent hover:bg-accent md:px-5"
        >
          Book intro
        </a>
      </nav>
    </header>
  );
}
