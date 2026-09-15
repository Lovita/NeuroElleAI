/**
 * Signature visual: a single continuous line that begins as an EEG/HRV-style
 * waveform on the left and resolves into a neural node network on the right —
 * the throughline of the whole platform (biosignal → brain). Built as static,
 * restrained SVG with a slow one-time draw-in animation (respects
 * prefers-reduced-motion via the .signal-trace CSS below).
 */
export function SignalTrace({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="An illustration of a physiological waveform transforming into a network of connected neural nodes"
    >
      <path
        className="signal-trace-path"
        d="M0 180
           L60 180 L80 100 L100 240 L120 60 L140 220 L160 180
           L220 180 L240 130 L260 210 L280 90 L300 180
           L360 180 C 420 180 430 120 480 120
           C 520 120 520 90 560 90
           C 610 90 610 150 660 150
           C 700 150 700 200 740 200
           C 780 200 800 130 830 130
           C 860 130 870 170 900 170
           L960 170"
        stroke="#0F4C5C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* neural nodes resolving out of the waveform */}
      {[
        [480, 120],
        [560, 90],
        [660, 150],
        [740, 200],
        [830, 130],
        [900, 170],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          className="signal-trace-node"
          style={{ animationDelay: `${1.1 + i * 0.12}s` }}
          cx={cx}
          cy={cy}
          r={i % 2 === 0 ? 6 : 4.5}
          fill="#E98775"
        />
      ))}
      {/* thin connective lines between the resolved nodes, echoing a neural graph */}
      <g className="signal-trace-links" stroke="#A8C7B8" strokeWidth="1.25">
        <line x1="480" y1="120" x2="560" y2="90" />
        <line x1="560" y1="90" x2="660" y2="150" />
        <line x1="660" y1="150" x2="740" y2="200" />
        <line x1="740" y1="200" x2="830" y2="130" />
        <line x1="480" y1="120" x2="660" y2="150" />
        <line x1="560" y1="90" x2="830" y2="130" />
      </g>
    </svg>
  )
}
