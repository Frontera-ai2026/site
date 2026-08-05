import { FLogo } from "./FLogo";
import { openPrivacyChoices } from "@/lib/consent";

export function DarkBar() {
  return (
    <footer className="bg-case-dark text-white/76">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[1fr_1fr_auto] md:px-8 xl:px-0">
        <div>
          <div className="flex items-center gap-3">
            <FLogo invert />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Frontera Global
            </p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/54">
            Decoding decisions. Designing change. Delivering outcomes for pharma teams.
          </p>
        </div>

        <div className="text-sm leading-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">
            Contact
          </p>
          <p className="mt-3 text-white">Craig Mills</p>
          <p className="text-white/48">Strategy director</p>
          <a
            href="mailto:craig@frontera-group.com"
            className="block transition-colors hover:text-accent"
          >
            craig@frontera-group.com
          </a>
          <a
            href="https://frontera.global/"
            target="_blank"
            rel="noreferrer"
            className="block text-white/48 transition-colors hover:text-accent"
          >
            frontera.global
          </a>
        </div>

        <div className="text-left text-xs leading-6 text-white/42 md:max-w-xs md:text-right">
          <p>Credentials and case examples are intended for internal review only.</p>
          <p className="mt-4">© 2026 Frontera Global</p>
          <button
            type="button"
            onClick={openPrivacyChoices}
            className="mt-3 underline underline-offset-4 transition-colors hover:text-accent focus:outline-none focus-visible:text-accent"
          >
            Privacy choices
          </button>
        </div>
      </div>
    </footer>
  );
}
