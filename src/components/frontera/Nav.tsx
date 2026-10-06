import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FLogo } from "./FLogo";
import { openEnquiryForm } from "@/lib/enquiry";

export const bookingUrl =
  "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled";

const hashLinks = [
  { id: "expertise", label: "Capabilities" },
  { id: "method", label: "Approach" },
  { id: "work", label: "Cases" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-xl transition-shadow ${
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

        <ul className="hidden items-center gap-5 text-base font-semibold lg:flex xl:gap-9">
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
               to="/credentials"
               className="text-foreground/58 transition-colors hover:text-accent"
              activeProps={{ className: "text-foreground transition-colors hover:text-accent" }}
            >
               Credentials
            </Link>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          type="button"
          onClick={openEnquiryForm}
          className="min-h-10 rounded-none border border-foreground bg-foreground px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-background hover:border-accent hover:bg-accent sm:px-4 sm:text-[11px]"
        >
          Speak to our team
        </Button>
        <Button type="button" variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
        </div>
      </nav>
      {menuOpen && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-5 py-3 lg:hidden">
        {hashLinks.map((link) => <a key={link.id} href={onHome ? `#${link.id}` : `/#${link.id}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 font-semibold text-foreground hover:text-accent">{link.label}</a>)}
        <Link to="/credentials" onClick={() => setMenuOpen(false)} className="block py-3 font-semibold text-foreground hover:text-accent">Credentials</Link>
      </nav>}
    </header>
  );
}
