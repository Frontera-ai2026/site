export function FLogo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-9 w-9 items-center justify-center border ${
        invert ? "border-white text-white" : "border-foreground text-foreground"
      } font-display font-black text-lg leading-none ${className}`}
    >
      F.
    </span>
  );
}
