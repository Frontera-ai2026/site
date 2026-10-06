import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet, L as Link, u as useRouter, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { W as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as REQUEST_TYPES, E as ENQUIRY_DISMISSED_KEY, O as OPEN_ENQUIRY_EVENT, o as openEnquiryForm } from "./enquiry-o3dXUj6o.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-8Sc3uNUS.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { A as Analytics } from "../_libs/vercel__analytics.mjs";
import { c as createTanStackInvokeToolHandler, a as createTanStackOAuthProtectedResourceMetadataHandler, b as createTanStackListToolsHandler, d as createTanStackMcpHandler, e as defineTool, f as defineMcp } from "../_libs/lovable.dev__mcp-js.mjs";
import { r as render } from "../_libs/react-email__render.mjs";
import { T as TEMPLATES } from "./registry-Zu_ijqFZ.mjs";
import { X, M as Menu, A as ArrowLeft, a as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { f as object, d as string, j as boolean, _ as _enum } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/seroval.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/jose.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "../_libs/ajv-formats.mjs";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
import "../_libs/html5parser.mjs";
import "../_libs/react-email__html.mjs";
import "../_libs/react-email__head.mjs";
import "../_libs/react-email__preview.mjs";
import "../_libs/react-email__body.mjs";
import "../_libs/react-email__container.mjs";
import "../_libs/react-email__heading.mjs";
import "../_libs/react-email__section.mjs";
import "../_libs/react-email__text.mjs";
const appCss = "/assets/styles-CDD7Hios.css";
const CONSENT_STORAGE_KEY = "frontera-consent-v1";
const CONSENT_EVENT = "frontera:consent-change";
const CONSENT_OPEN_PREFS_EVENT = "frontera:open-privacy-choices";
function getConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1) return parsed;
    return null;
  } catch {
    return null;
  }
}
function setConsent(decision, categories) {
  const record = {
    version: 1,
    decision,
    categories: {
      essential: true,
      analytics: !!categories.analytics,
      marketing: !!categories.marketing
    },
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  return record;
}
function openPrivacyChoices() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_PREFS_EVENT));
}
const PRIVACY_URL = "/privacy-policy";
const COOKIE_URL = "/cookie-policy";
function ConsentBanner() {
  const [view, setView] = reactExports.useState("hidden");
  const [analytics, setAnalytics] = reactExports.useState(true);
  const [marketing, setMarketing] = reactExports.useState(true);
  const dialogRef = reactExports.useRef(null);
  const titleId = reactExports.useId();
  const descId = reactExports.useId();
  reactExports.useEffect(() => {
    const stored = getConsent();
    if (stored) ;
    else {
      setView("welcome");
    }
    const openPrefs = () => {
      const s = getConsent();
      if (s) {
        setAnalytics(s.categories.analytics);
        setMarketing(s.categories.marketing);
      }
      setView("preferences");
    };
    window.addEventListener(CONSENT_OPEN_PREFS_EVENT, openPrefs);
    return () => window.removeEventListener(CONSENT_OPEN_PREFS_EVENT, openPrefs);
  }, []);
  reactExports.useEffect(() => {
    if (view === "hidden") return;
    const t = window.setTimeout(() => {
      const first = dialogRef.current?.querySelector(
        "button, [href], input, [tabindex]:not([tabindex='-1'])"
      );
      first?.focus();
    }, 30);
    return () => window.clearTimeout(t);
  }, [view]);
  reactExports.useEffect(() => {
    const onChange = () => {
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);
  const acceptAll = reactExports.useCallback(() => {
    setConsent("personalised", { analytics: true, marketing: true });
    setView("hidden");
  }, []);
  const rejectAll = reactExports.useCallback(() => {
    setConsent("standard", { analytics: false, marketing: false });
    setView("hidden");
  }, []);
  const saveCustom = reactExports.useCallback(() => {
    const allOn = analytics && marketing;
    const allOff = !analytics && !marketing;
    const decision = allOn ? "personalised" : allOff ? "standard" : "custom";
    setConsent(decision, { analytics, marketing });
    setView("hidden");
  }, [analytics, marketing]);
  if (view === "hidden") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:left-auto sm:justify-end sm:px-0 sm:pb-0",
      role: "dialog",
      "aria-modal": "false",
      "aria-labelledby": titleId,
      "aria-describedby": descId,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: dialogRef,
          className: "pointer-events-auto w-full max-w-md overflow-hidden rounded-lg border border-border bg-background shadow-2xl",
          children: view === "welcome" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            WelcomeView,
            {
              titleId,
              descId,
              onAcceptAll: acceptAll,
              onRejectAll: rejectAll,
              onManage: () => setView("preferences")
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            PreferencesView,
            {
              titleId,
              descId,
              analytics,
              marketing,
              setAnalytics,
              setMarketing,
              onSave: saveCustom,
              onBack: () => setView("welcome")
            }
          )
        }
      )
    }
  );
}
function WelcomeView({
  titleId,
  descId,
  onAcceptAll,
  onRejectAll,
  onManage
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: titleId,
        className: "font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
        children: "Welcome"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: descId, className: "mt-4 space-y-3 text-sm leading-7 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Explore our case studies in full, get to know who we are, and see how we help leading pharma teams make better informed decisions." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "With your permission, we use optional analytics and marketing technologies to understand which content matters most to you, identify business interest in Frontera, and tailor your experience." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConsentButton,
        {
          onClick: onAcceptAll,
          title: "Enter personalised experience",
          subtitle: "Allow optional analytics and marketing technologies",
          variant: "primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConsentButton,
        {
          onClick: onRejectAll,
          title: "Enter standard experience",
          subtitle: "Continue with essential technologies only",
          variant: "secondary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onManage,
          className: "underline underline-offset-4 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: "Manage privacy choices"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: PRIVACY_URL,
            className: "underline underline-offset-4 hover:text-foreground",
            children: "Privacy Policy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: COOKIE_URL,
            className: "underline underline-offset-4 hover:text-foreground",
            children: "Cookie Policy"
          }
        )
      ] })
    ] })
  ] });
}
function PreferencesView({
  titleId,
  descId,
  analytics,
  marketing,
  setAnalytics,
  setMarketing,
  onSave,
  onBack
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: titleId,
        className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
        children: "Privacy choices"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: descId, className: "mt-3 text-sm leading-6 text-muted-foreground", children: "Choose which optional technologies you allow. Essential technologies are always on because they are needed for the site to work." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreferenceRow,
        {
          title: "Essential",
          badge: "Always on",
          description: "Required to serve pages, remember your privacy choices, and keep the site secure. Cannot be turned off.",
          checked: true,
          disabled: true,
          onChange: () => {
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreferenceRow,
        {
          title: "Analytics",
          badge: "Optional",
          description: "Helps us understand which case studies and pages people find most useful, so we can improve what we publish.",
          checked: analytics,
          onChange: setAnalytics
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreferenceRow,
        {
          title: "Marketing",
          badge: "Optional",
          description: "Helps us understand which organisations may be interested in Frontera’s services and supports relevant business communications.",
          checked: marketing,
          onChange: setMarketing
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onSave,
          className: "inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: "Save choices"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: "Back"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: PRIVACY_URL, className: "underline underline-offset-4 hover:text-foreground", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: COOKIE_URL, className: "underline underline-offset-4 hover:text-foreground", children: "Cookie Policy" })
    ] })
  ] });
}
function ConsentButton({
  onClick,
  title,
  subtitle,
  variant
}) {
  const base = "group flex h-full flex-col rounded-md border px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const styles = variant === "primary" ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90" : "border-input bg-background text-foreground hover:bg-secondary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: `${base} ${styles}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold leading-tight", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `mt-1 text-xs leading-5 ${variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"}`,
        children: subtitle
      }
    )
  ] });
}
function PreferenceRow({
  title,
  badge,
  description,
  checked,
  disabled,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-md border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground", children: badge })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-6 text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex shrink-0 cursor-pointer items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          className: "peer sr-only",
          checked,
          disabled,
          onChange: (e) => onChange(e.target.checked),
          "aria-label": `${title} — ${checked ? "enabled" : "disabled"}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          "aria-hidden": true,
          className: `h-6 w-11 rounded-full bg-input transition-colors peer-checked:bg-primary peer-disabled:opacity-60 peer-focus-visible:ring-2 peer-focus-visible:ring-ring`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          "aria-hidden": true,
          className: "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform peer-checked:translate-x-5"
        }
      )
    ] })
  ] }) });
}
var createSsrRpc = (functionId) => {
  const url2 = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url: url2,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const enquirySchema = object({
  requestType: _enum(REQUEST_TYPES),
  firstName: string().trim().min(1, "First name is required").max(80),
  lastName: string().trim().min(1, "Last name is required").max(80),
  email: string().trim().email("Enter a valid email address").max(255),
  mobile: string().trim().min(7, "Enter a valid mobile number").max(24).regex(/^[+0-9][0-9()\-\s.]{5,23}$/, "Enter a valid mobile number with country code"),
  company: string().trim().min(1, "Company is required").max(120),
  jobTitle: string().trim().min(1, "Job title is required").max(120),
  note: string().trim().max(1e3).optional().default(""),
  whatsapp: boolean().default(false),
  page: string().trim().max(300).default(""),
  companyWebsite: string().optional().default("")
});
const submitEnquiry = createServerFn({
  method: "POST"
}).inputValidator((data) => enquirySchema.parse(data)).handler(createSsrRpc("617707e00effff11fe2ad158ad24aa66c3e087d1885e1e35dc054328f3e2b494"));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function FLogo({ className = "", invert = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: `inline-flex h-9 w-9 items-center justify-center border ${invert ? "border-white text-white" : "border-foreground text-foreground"} font-display font-black text-lg leading-none ${className}`,
      children: "F."
    }
  );
}
const bookingUrl = "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled";
const hashLinks = [
  { id: "expertise", label: "Capabilities" },
  { id: "method", label: "Approach" },
  { id: "work", label: "Cases" }
];
function Nav() {
  const [active, setActive] = reactExports.useState("");
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    const sections = hashLinks.map((l) => document.getElementById(l.id)).filter((el) => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -58% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-xl transition-shadow ${scrolled ? "shadow-[0_12px_40px_rgba(18,23,27,0.08)]" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 xl:px-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group flex items-center gap-3", "aria-label": "Frontera Global home", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FLogo, { className: "transition-colors group-hover:border-accent group-hover:text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-sm font-semibold tracking-[0.18em] text-foreground sm:inline", children: "FRONTERA GLOBAL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "hidden items-center gap-5 text-base font-semibold lg:flex xl:gap-9", children: [
            hashLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: onHome ? `#${l.id}` : `/#${l.id}`,
                className: `transition-colors hover:text-accent ${active === l.id ? "text-foreground" : "text-foreground/58"}`,
                children: l.label
              }
            ) }, l.label)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/credentials",
                className: "text-foreground/58 transition-colors hover:text-accent",
                activeProps: { className: "text-foreground transition-colors hover:text-accent" },
                children: "Credentials"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 lg:ml-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: openEnquiryForm,
                className: "min-h-10 rounded-none border border-foreground bg-foreground px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-background hover:border-accent hover:bg-accent sm:px-4 sm:text-[11px]",
                children: "Speak to our team"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "lg:hidden", "aria-label": menuOpen ? "Close navigation" : "Open navigation", "aria-expanded": menuOpen, onClick: () => setMenuOpen((value) => !value), children: menuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { "aria-hidden": "true" }) })
          ] })
        ] }),
        menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": "Mobile navigation", className: "border-t border-border bg-background px-5 py-3 lg:hidden", children: [
          hashLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: onHome ? `#${link.id}` : `/#${link.id}`, onClick: () => setMenuOpen(false), className: "block border-b border-border py-3 font-semibold text-foreground hover:text-accent", children: link.label }, link.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/credentials", onClick: () => setMenuOpen(false), className: "block py-3 font-semibold text-foreground hover:text-accent", children: "Credentials" })
        ] })
      ]
    }
  );
}
const inputClass = "w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none";
function EnquiryForm({ onClose }) {
  const [requestType, setRequestType] = reactExports.useState(REQUEST_TYPES[0]);
  const [values, setValues] = reactExports.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    jobTitle: "",
    note: "",
    companyWebsite: ""
    // honeypot
  });
  const [whatsapp, setWhatsapp] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [status, setStatus] = reactExports.useState("idle");
  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: void 0 }));
  };
  const validate = () => {
    const er = {};
    if (!values.firstName.trim()) er.firstName = "Please enter your first name.";
    if (!values.lastName.trim()) er.lastName = "Please enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      er.email = "Please enter a valid email address.";
    if (!/^[+0-9][0-9()\-\s.]{5,23}$/.test(values.mobile.trim()))
      er.mobile = "Please enter a valid mobile number, including your country code.";
    if (!values.company.trim()) er.company = "Please enter your company.";
    if (!values.jobTitle.trim()) er.jobTitle = "Please enter your job title.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setStatus("sending");
    try {
      const payload = {
        requestType,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        mobile: values.mobile.trim(),
        company: values.company.trim(),
        jobTitle: values.jobTitle.trim(),
        note: values.note.trim() || void 0,
        whatsapp,
        page: window.location.pathname,
        companyWebsite: values.companyWebsite
      };
      await submitEnquiry({ data: payload });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };
  if (status === "sent") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-bold text-foreground", children: [
        "Thanks, ",
        values.firstName.trim(),
        ". We’ve received your enquiry."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: "Someone from our team will be in touch about your request." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-sm text-muted-foreground", children: [
        "Prefer to choose a time now?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: bookingUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "font-semibold text-accent underline underline-offset-4",
            children: "Book an intro call."
          }
        )
      ] }),
      onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "mt-6 inline-flex min-h-11 items-center justify-center border border-foreground px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background",
          children: "Close"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, noValidate: true, className: "p-6 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground", children: "How can we help?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: "Have a challenge in mind, or simply exploring? Get in touch with our team." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-request", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "I’d like to…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "enq-request",
          value: requestType,
          onChange: (e) => setRequestType(e.target.value),
          className: inputClass,
          children: REQUEST_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-first", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "First name*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-first", autoComplete: "given-name", className: inputClass, value: values.firstName, onChange: set("firstName"), "aria-invalid": !!errors.firstName }),
        errors.firstName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.firstName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-last", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "Last name*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-last", autoComplete: "family-name", className: inputClass, value: values.lastName, onChange: set("lastName"), "aria-invalid": !!errors.lastName }),
        errors.lastName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.lastName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-email", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "Work email*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-email", type: "email", autoComplete: "email", inputMode: "email", className: inputClass, value: values.email, onChange: set("email"), "aria-invalid": !!errors.email }),
        errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-mobile", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "Mobile number*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-mobile", type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+44…", className: inputClass, value: values.mobile, onChange: set("mobile"), "aria-invalid": !!errors.mobile, "aria-describedby": "enq-mobile-hint" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "enq-mobile-hint", className: "mt-1 text-xs text-muted-foreground", children: "Include your country code." }),
        errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.mobile })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-company", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "Company*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-company", autoComplete: "organization", className: inputClass, value: values.company, onChange: set("company"), "aria-invalid": !!errors.company }),
        errors.company && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.company })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-title", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "Job title*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-title", autoComplete: "organization-title", className: inputClass, value: values.jobTitle, onChange: set("jobTitle"), "aria-invalid": !!errors.jobTitle }),
        errors.jobTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.jobTitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": "true", className: "absolute -left-[9999px] top-auto h-px w-px overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-website", children: "Company website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "enq-website", tabIndex: -1, autoComplete: "off", value: values.companyWebsite, onChange: set("companyWebsite") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "enq-note", className: "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground", children: "Anything you’d like us to know? (optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "enq-note", rows: 3, placeholder: "A sentence or two is plenty.", className: inputClass, value: values.note, onChange: set("note") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs leading-5 text-muted-foreground", children: [
      "By submitting this form, you consent to Frontera contacting you by email or phone about your enquiry, including providing any information or case studies you request.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy-policy", className: "underline underline-offset-2 hover:text-accent", children: "Click here to reach our privacy policy." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-3 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: whatsapp,
          onChange: (e) => setWhatsapp(e.target.checked),
          className: "mt-0.5 h-4 w-4 accent-[#00b4d8]"
        }
      ),
      "Frontera can also contact me on WhatsApp about this enquiry, including sending information and case studies."
    ] }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-destructive", role: "alert", children: "Something went wrong sending your enquiry. Your details are still here — please try again, or email us directly." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: status === "sending",
        className: "mt-5 inline-flex min-h-12 w-full items-center justify-center bg-accent px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-foreground disabled:opacity-60",
        children: status === "sending" ? "Sending…" : "Send enquiry"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[11px] leading-5 text-muted-foreground", children: [
      "*Required fields. See our",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy-policy", className: "underline underline-offset-2 hover:text-accent", children: "Privacy Notice" }),
      "."
    ] })
  ] });
}
const TRIGGER_MS = 25e3;
function EnquirySlideIn() {
  const [open, setOpen] = reactExports.useState(false);
  const [dismissed, setDismissed] = reactExports.useState(false);
  const [consentReady, setConsentReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setConsentReady(!!getConsent());
    const onConsent = () => setConsentReady(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);
  reactExports.useEffect(() => {
    try {
      if (window.sessionStorage.getItem(ENQUIRY_DISMISSED_KEY)) setDismissed(true);
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (open || dismissed || !consentReady) return;
    let elapsed = 0;
    let scrolledPast = window.scrollY > window.innerHeight * 0.8;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) scrolledPast = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      elapsed += 1e3;
      if (elapsed >= TRIGGER_MS && scrolledPast) {
        setOpen(true);
        window.clearInterval(interval);
      }
    }, 1e3);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(interval);
    };
  }, [open, dismissed, consentReady]);
  reactExports.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_ENQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ENQUIRY_EVENT, onOpen);
  }, []);
  const close = () => {
    setOpen(false);
    setDismissed(true);
    try {
      window.sessionStorage.setItem(ENQUIRY_DISMISSED_KEY, "1");
    } catch {
    }
  };
  if (open) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "How can we help?",
        className: "fixed inset-0 z-[60] overflow-y-auto bg-background shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[520px] sm:border-l sm:border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: close,
              "aria-label": "Close enquiry form",
              className: "absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EnquiryForm, { onClose: close })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => setOpen(true),
      className: "fixed bottom-4 right-4 z-50 inline-flex min-h-11 items-center gap-2 bg-foreground px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-background shadow-lg transition-colors hover:bg-accent sm:bottom-6 sm:right-6",
      children: "How can we help?"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$g = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Frontera Global" },
      { property: "og:site_name", content: "Frontera Global" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Frontera Global — Behavioural Intelligence for Healthcare" },
      {
        property: "og:title",
        content: "Frontera Global — Behavioural Intelligence for Healthcare"
      },
      {
        name: "twitter:title",
        content: "Frontera Global — Behavioural Intelligence for Healthcare"
      },
      {
        name: "description",
        content: "Frontera Global combines AI-driven research, strategy and creative with behavioural science to help pharma teams change behaviour."
      },
      {
        property: "og:description",
        content: "AI-driven research, strategy and creative for pharma teams."
      },
      {
        name: "twitter:description",
        content: "AI-driven research, strategy and creative for pharma teams."
      }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Frontera Global",
              url: "https://frontera-creds.lovable.app",
              sameAs: ["https://frontera.global/", "https://www.linkedin.com/in/cpmills/"]
            },
            {
              "@type": "WebSite",
              name: "Frontera Global",
              url: "https://frontera-creds.lovable.app"
            }
          ]
        })
      },
      {
        children: `!function(){var e="rest.happierleads.com/v3/script?clientId=98S7wB6pspZC81zWSBW8MG&version=4.0.0",t=document.createElement("script");window.location.protocol.split(":")[0];t.src="https://"+e;var c=document.getElementsByTagName("script")[0];t.async=true;t.onload=function(){new Happierleads.default};c.parentNode.insertBefore(t,c)}();`
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorComponent, { error: props.error, reset: props.reset })
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$g.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConsentBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EnquirySlideIn, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Analytics, {})
  ] });
}
const $$splitComponentImporter$9 = () => import("./index-BQlPqmv8.mjs");
const Route$f = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Frontera Global — Behavioural Intelligence for Healthcare"
    }, {
      name: "description",
      content: "AI-driven research, strategy and creative paired with behavioural science to help pharma teams change behaviour and deliver real-world impact."
    }, {
      property: "og:title",
      content: "Frontera Global — Behavioural Intelligence for Healthcare"
    }, {
      property: "og:description",
      content: "AI-driven research, strategy and creative for pharma teams."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./cinematic-preview-CNwsdyba.mjs");
const Route$e = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Cinematic Preview — Frontera Global"
    }, {
      name: "description",
      content: "A cinematic visual study for Frontera Global."
    }, {
      property: "og:title",
      content: "Cinematic Preview — Frontera Global"
    }, {
      property: "og:description",
      content: "A cinematic visual study for Frontera Global."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./cookie-policy-D2TzdPo6.mjs");
const Route$d = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Cookie Policy — Frontera Global"
    }, {
      name: "description",
      content: "Which cookies and similar technologies frontera-group.com uses, why, and how you can control them."
    }, {
      property: "og:title",
      content: "Cookie Policy — Frontera Global"
    }, {
      property: "og:description",
      content: "Which cookies and similar technologies frontera-group.com uses, why, and how you can control them."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }],
    links: [{
      rel: "canonical",
      href: "/cookie-policy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./credentials-DyHuhdHj.mjs");
const Route$c = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Credentials & Therapeutic Experience — Frontera Global"
    }, {
      name: "description",
      content: "Explore Frontera Global's credentials, connected behavioural approach and therapeutic area experience."
    }, {
      property: "og:title",
      content: "Credentials & Therapeutic Experience — Frontera Global"
    }, {
      property: "og:description",
      content: "Explore our credentials and find Frontera's experience by therapeutic area."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./editorial-preview-HmHVk6A6.mjs");
const Route$b = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Editorial Preview — Frontera Global"
    }, {
      name: "description",
      content: "An editorial design study for Frontera Global healthcare strategy."
    }, {
      property: "og:title",
      content: "Editorial Preview — Frontera Global"
    }, {
      property: "og:description",
      content: "An editorial design study for Frontera Global healthcare strategy."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const getCompanyOverview = defineTool({
  name: "get_company_overview",
  title: "Get Frontera company overview",
  description: "Returns a summary of Frontera Global — a behavioural-intelligence consultancy for healthcare/pharma — including positioning, disciplines, and contact info.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const overview = {
      name: "Frontera Global",
      tagline: "Behavioural Intelligence for Healthcare",
      summary: "Frontera Global combines AI-driven research, strategy and creative with behavioural science (CBI™ — Cognitive Behavioural Intelligence) to help pharma teams change behaviour.",
      disciplines: ["Research", "Strategy", "Creative"],
      audience: "Pharmaceutical and healthcare teams",
      website: "https://fronteracreds.com",
      bookingUrl: "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled",
      contactEmail: "craig@frontera.global"
    };
    return {
      content: [{ type: "text", text: JSON.stringify(overview, null, 2) }],
      structuredContent: overview
    };
  }
});
const CASES = [
  {
    slug: "case-research",
    title: "Research case",
    summary: "AI-augmented qualitative and quantitative research uncovering behavioural drivers in a specialist therapy area.",
    url: "https://fronteracreds.com/case-research"
  },
  {
    slug: "case-launch",
    title: "Launch case",
    summary: "Behaviourally-grounded launch strategy and creative platform for a new pharmaceutical brand.",
    url: "https://fronteracreds.com/case-launch"
  },
  {
    slug: "case-journey",
    title: "Patient journey case",
    summary: "Mapping and re-shaping the patient journey using Cognitive Behavioural Intelligence (CBI™).",
    url: "https://fronteracreds.com/case-journey"
  }
];
const listCaseStudies = defineTool({
  name: "list_case_studies",
  title: "List Frontera case studies",
  description: "Returns Frontera Global's published case studies with a short summary and public URL for each.",
  inputSchema: {
    slug: string().optional().describe("Optional case slug (e.g. 'case-launch') to return a single case.")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const items = slug ? CASES.filter((c) => c.slug === slug) : CASES;
    if (slug && items.length === 0) {
      return {
        content: [{ type: "text", text: `No case study found with slug "${slug}".` }],
        isError: true
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { cases: items }
    };
  }
});
const getBookingLink = defineTool({
  name: "get_booking_link",
  title: "Get Frontera intro call booking link",
  description: "Returns a link the user can open to book an introductory call with Frontera Global.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: () => {
    const url2 = "https://outlook.office.com/book/FronteraIntroCall2@frontera-group.com/?ismsaljsauthenabled";
    return {
      content: [
        {
          type: "text",
          text: `Book a 30-minute intro call with Frontera Global here: ${url2}`
        }
      ],
      structuredContent: { bookingUrl: url2 }
    };
  }
});
const mcp = defineMcp({
  name: "frontera-mcp",
  title: "Frontera Global MCP",
  version: "0.1.0",
  instructions: "Public tools for Frontera Global — a behavioural-intelligence consultancy for healthcare. Use `get_company_overview` for positioning and contact info, `list_case_studies` to browse published cases (optionally by slug), and `get_booking_link` to share an intro-call booking URL.",
  tools: [getCompanyOverview, listCaseStudies, getBookingLink]
});
const Route$a = createFileRoute()({
  server: {
    handlers: {
      ANY: createTanStackMcpHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const $$splitComponentImporter$4 = () => import("./privacy-policy-Czi71u15.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Privacy Policy — Frontera Global"
    }, {
      name: "description",
      content: "How Frontera Global collects, uses and protects personal data, and your rights under the UK GDPR and EU GDPR."
    }, {
      property: "og:title",
      content: "Privacy Policy — Frontera Global"
    }, {
      property: "og:description",
      content: "How Frontera Global collects, uses and protects personal data, and your rights under the UK GDPR and EU GDPR."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }],
    links: [{
      rel: "canonical",
      href: "/privacy-policy"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./reference-article-BLYVfk3X.mjs");
const Route$8 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Our Approach — Frontera Global"
    }, {
      name: "description",
      content: "Decode, design and deploy: Frontera's approach to moving healthcare behaviour forward."
    }, {
      property: "og:title",
      content: "Our Approach — Frontera Global"
    }, {
      property: "og:description",
      content: "See Frontera's Decode, Design and Deploy approach to healthcare behaviour change."
    }, {
      property: "og:type",
      content: "article"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const BASE_URL = "https://frontera-creds.lovable.app";
const Route$7 = createFileRoute()({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$2 = () => import("./text-rotate-preview-BPl7xcsw.mjs");
const Route$6 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Text Motion Preview — Frontera Global"
    }, {
      name: "description",
      content: "Preview motion treatments for Frontera Global messaging."
    }, {
      property: "og:title",
      content: "Text Motion Preview — Frontera Global"
    }, {
      property: "og:description",
      content: "Preview motion treatments for Frontera Global messaging."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./theme-preview-BdulX9Zl.mjs");
const Route$5 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Theme Preview — Frontera Global"
    }, {
      name: "description",
      content: "Explore a visual theme study for Frontera Global."
    }, {
      property: "og:title",
      content: "Theme Preview — Frontera Global"
    }, {
      property: "og:description",
      content: "Explore a visual theme study for Frontera Global."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const Route$4 = createFileRoute()({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackListToolsHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route$3 = createFileRoute()({
  server: {
    handlers: {
      ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
function DarkBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-case-dark text-white/76", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[1fr_1fr_auto] md:px-8 xl:px-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FLogo, { invert: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-white", children: "Frontera Global" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-sm leading-7 text-white/54", children: "Decoding decisions. Designing change. Delivering outcomes for pharma teams." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm leading-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white", children: "Craig Mills" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/48", children: "Strategy director" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "mailto:craig@frontera-group.com",
          className: "block transition-colors hover:text-accent",
          children: "craig@frontera-group.com"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://frontera.global/",
          target: "_blank",
          rel: "noreferrer",
          className: "block text-white/48 transition-colors hover:text-accent",
          children: "frontera.global"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-6 text-white/54", children: "Have a challenge in mind, or simply exploring?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: openEnquiryForm,
          className: "mt-3 inline-flex min-h-11 items-center justify-center bg-accent px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-foreground",
          children: "Speak to our team"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left text-xs leading-6 text-white/42 md:max-w-xs md:text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Credentials and case examples are intended for internal review only." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4", children: "© 2026 Frontera Global" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: openPrivacyChoices,
          className: "mt-3 underline underline-offset-4 transition-colors hover:text-accent focus:outline-none focus-visible:text-accent",
          children: "Privacy choices"
        }
      )
    ] })
  ] }) });
}
const url$4 = "/__l5e/assets-v1/9babac15-afd1-4f27-9be1-f04026605bd0/cardiovascular-credentials.jpeg";
const cardiovascularImage = {
  url: url$4
};
const url$3 = "/__l5e/assets-v1/5dcd68e1-3159-47af-acac-de55c117c562/ckd-credentials.jpeg";
const ckdImage = {
  url: url$3
};
const url$2 = "/__l5e/assets-v1/b0fe3c50-4b03-42d9-9348-48f48828edfa/obesity-mash-credentials.jpeg";
const obesityMashImage = {
  url: url$2
};
const url$1 = "/__l5e/assets-v1/31d77ace-2b8d-42d0-b5ac-11f42f3d838e/diagnostics-credentials.jpeg";
const diagnosticsImage = {
  url: url$1
};
const url = "/__l5e/assets-v1/e029018c-8cba-4aef-90e9-f378289d694f/aesthetics-credentials.jpeg";
const aestheticsImage = {
  url
};
const therapyAreas = [
  { name: "Cardiovascular", slug: "cardiovascular", number: "01", image: cardiovascularImage.url },
  { name: "CKD", slug: "ckd", number: "02", image: ckdImage.url },
  { name: "Obesity & MASH", slug: "obesity-mash", number: "03", image: obesityMashImage.url },
  { name: "Diagnostics", slug: "diagnostics", number: "04", image: diagnosticsImage.url },
  { name: "Aesthetics", slug: "aesthetics", number: "05", image: aestheticsImage.url }
];
function TherapyCredentials({ area }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-case-dark text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24 xl:px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/credentials", className: "inline-flex items-center gap-2 text-sm text-primary-foreground/65 transition-colors hover:text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4", "aria-hidden": "true" }),
          " All credentials"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-accent", children: [
          "Therapeutic area / ",
          area.number
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 max-w-4xl font-display text-5xl leading-tight md:text-7xl", children: area.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 max-w-xl text-base leading-8 text-primary-foreground/70", children: [
          "Frontera credentials and experience in ",
          area.name,
          "."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16 xl:px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 border-b border-border pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            area.name,
            " credentials"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: area.image, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent", children: [
            "Open full size ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4", "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: area.image, target: "_blank", rel: "noopener noreferrer", "aria-label": `Open ${area.name} credentials full size`, className: "mx-auto mt-8 block max-w-[746px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: area.image, alt: `Frontera Global ${area.name} credentials: Decode, Design and Deploy experience`, width: "746", height: "1054", className: "block h-auto w-full" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DarkBar, {})
    ] })
  ] });
}
const $$splitComponentImporter = () => import("./credentials_._area-S_iETr21.mjs");
const Route$2 = createFileRoute()({
  loader: ({
    params
  }) => {
    const area = therapyAreas.find((item) => item.slug === params.area);
    if (!area) throw notFound();
    return area;
  },
  head: ({
    loaderData
  }) => ({
    meta: [{
      title: loaderData ? `${loaderData.name} Credentials — Frontera Global` : "Therapeutic Area — Frontera Global"
    }, {
      name: "description",
      content: loaderData ? `Explore Frontera Global's ${loaderData.name} credentials and experience across research, strategy and engagement.` : "Explore Frontera Global therapeutic areas."
    }, {
      property: "og:title",
      content: loaderData ? `${loaderData.name} Credentials — Frontera Global` : "Therapeutic Area — Frontera Global"
    }, {
      property: "og:description",
      content: loaderData ? `View Frontera Global's ${loaderData.name} credentials and therapeutic experience.` : "Explore Frontera therapeutic areas."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$1 = createFileRoute()({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackInvokeToolHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route = createFileRoute()({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace(/^Bearer\s+/i, "");
        if (token !== apiKey) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const templateNames = Object.keys(TEMPLATES);
        const results = [];
        for (const name of templateNames) {
          const entry = TEMPLATES[name];
          const displayName = entry.displayName || name;
          if (!entry.previewData) {
            results.push({
              templateName: name,
              displayName,
              subject: "",
              html: "",
              status: "preview_data_required"
            });
            continue;
          }
          try {
            const html = await render(
              reactExports.createElement(entry.component, entry.previewData)
            );
            const resolvedSubject = typeof entry.subject === "function" ? entry.subject(entry.previewData) : entry.subject;
            results.push({
              templateName: name,
              displayName,
              subject: resolvedSubject,
              html,
              status: "ready"
            });
          } catch (err) {
            console.error("Failed to render template for preview", {
              template: name,
              error: err
            });
            results.push({
              templateName: name,
              displayName,
              subject: "",
              html: "",
              status: "render_failed",
              errorMessage: err instanceof Error ? err.message : String(err)
            });
          }
        }
        return Response.json({ templates: results });
      }
    }
  }
});
const IndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const CinematicPreviewRoute = Route$e.update({
  id: "/cinematic-preview",
  path: "/cinematic-preview",
  getParentRoute: () => Route$g
});
const CookiePolicyRoute = Route$d.update({
  id: "/cookie-policy",
  path: "/cookie-policy",
  getParentRoute: () => Route$g
});
const CredentialsRoute = Route$c.update({
  id: "/credentials",
  path: "/credentials",
  getParentRoute: () => Route$g
});
const EditorialPreviewRoute = Route$b.update({
  id: "/editorial-preview",
  path: "/editorial-preview",
  getParentRoute: () => Route$g
});
const McpRoute = Route$a.update({
  id: "/mcp",
  path: "/mcp",
  getParentRoute: () => Route$g
});
const PrivacyPolicyRoute = Route$9.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$g
});
const ReferenceArticleRoute = Route$8.update({
  id: "/reference-article",
  path: "/reference-article",
  getParentRoute: () => Route$g
});
const SitemapDotxmlRoute = Route$7.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$g
});
const TextRotatePreviewRoute = Route$6.update({
  id: "/text-rotate-preview",
  path: "/text-rotate-preview",
  getParentRoute: () => Route$g
});
const ThemePreviewRoute = Route$5.update({
  id: "/theme-preview",
  path: "/theme-preview",
  getParentRoute: () => Route$g
});
const Char91DotmcpChar93ListToolsRoute = Route$4.update({
  id: "/.mcp/list-tools",
  path: "/.mcp/list-tools",
  getParentRoute: () => Route$g
});
const Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$3.update({
  id: "/.well-known/oauth-protected-resource",
  path: "/.well-known/oauth-protected-resource",
  getParentRoute: () => Route$g
});
const CredentialsAreaRoute = Route$2.update({
  id: "/credentials_/$area",
  path: "/credentials/$area",
  getParentRoute: () => Route$g
});
const Char91DotmcpChar93InvokeToolToolRoute = Route$1.update({
  id: "/.mcp/invoke-tool/$tool",
  path: "/.mcp/invoke-tool/$tool",
  getParentRoute: () => Route$g
});
const LovableEmailTransactionalPreviewRoute = Route.update({
  id: "/lovable/email/transactional/preview",
  path: "/lovable/email/transactional/preview",
  getParentRoute: () => Route$g
});
const rootRouteChildren = {
  IndexRoute,
  CinematicPreviewRoute,
  CookiePolicyRoute,
  CredentialsRoute,
  EditorialPreviewRoute,
  McpRoute,
  PrivacyPolicyRoute,
  ReferenceArticleRoute,
  SitemapDotxmlRoute,
  TextRotatePreviewRoute,
  ThemePreviewRoute,
  Char91DotmcpChar93ListToolsRoute,
  Char91DotwellKnownChar93OauthProtectedResourceRoute,
  CredentialsAreaRoute,
  Char91DotmcpChar93InvokeToolToolRoute,
  LovableEmailTransactionalPreviewRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  DarkBar as D,
  Nav as N,
  Route$2 as R,
  TherapyCredentials as T,
  bookingUrl as b,
  cn as c,
  openPrivacyChoices as o,
  router as r,
  therapyAreas as t
};
