/** Static grain ambient layer — no WebGL (AUR-P1-03 / P-AUR-2). */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="ambient-grain absolute inset-0" />
    </div>
  );
}
