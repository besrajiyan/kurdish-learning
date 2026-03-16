export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-56 sm:h-72 overflow-hidden rounded-3xl shadow-lg">
      <svg viewBox="0 0 800 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3d70" />
            <stop offset="40%" stopColor="#3B7DDD" />
            <stop offset="100%" stopColor="#E8F1FC" />
          </linearGradient>
          <linearGradient id="mountain-green" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D9B6E" />
            <stop offset="100%" stopColor="#134533" />
          </linearGradient>
          <linearGradient id="mountain-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F7050" />
            <stop offset="100%" stopColor="#0A2B1F" />
          </linearGradient>
          <linearGradient id="sun-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#C4841C" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="800" height="320" fill="url(#sky)" />

        {/* Stars in sky */}
        <circle cx="100" cy="30" r="1.5" fill="white" opacity="0.7" />
        <circle cx="200" cy="50" r="1" fill="white" opacity="0.5" />
        <circle cx="350" cy="25" r="1.5" fill="white" opacity="0.6" />
        <circle cx="550" cy="40" r="1" fill="white" opacity="0.4" />
        <circle cx="700" cy="20" r="1.5" fill="white" opacity="0.5" />
        <circle cx="750" cy="55" r="1" fill="white" opacity="0.3" />

        {/* === Kurdish Sun (Roj) — 21 rays === */}
        <g transform="translate(400, 110)">
          {/* Sun glow */}
          <circle cx="0" cy="0" r="70" fill="#F5A623" opacity="0.15">
            <animate attributeName="r" values="70;80;70" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="55" fill="#F5A623" opacity="0.2">
            <animate attributeName="r" values="55;62;55" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* 21 rays — sacred number in Kurdish culture */}
          {Array.from({ length: 21 }).map((_, i) => {
            const angle = (i * 360) / 21 - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = Math.cos(rad) * 30;
            const y1 = Math.sin(rad) * 30;
            const x2 = Math.cos(rad) * 50;
            const y2 = Math.sin(rad) * 50;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#F5A623"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.9"
              />
            );
          })}

          {/* Sun disc */}
          <circle cx="0" cy="0" r="28" fill="url(#sun-glow)" />
          <circle cx="0" cy="0" r="22" fill="#F5A623" />

          {/* Sun face — friendly for kids */}
          <circle cx="-7" cy="-4" r="3" fill="#7A5211" />
          <circle cx="7" cy="-4" r="3" fill="#7A5211" />
          <path d="M-8,6 Q0,14 8,6" fill="none" stroke="#7A5211" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Mountains — Kurdistan "land of mountains" */}
        {/* Back mountains */}
        <polygon points="0,280 120,140 240,280" fill="url(#mountain-dark)" opacity="0.4" />
        <polygon points="180,280 350,120 520,280" fill="url(#mountain-green)" opacity="0.5" />
        <polygon points="450,280 620,130 800,280" fill="url(#mountain-dark)" opacity="0.4" />

        {/* Front mountains */}
        <polygon points="50,280 220,155 390,280" fill="url(#mountain-green)" opacity="0.7" />
        <polygon points="300,280 500,145 700,280" fill="url(#mountain-dark)" opacity="0.6" />

        {/* Snow caps */}
        <polygon points="220,155 205,175 235,175" fill="white" opacity="0.8" />
        <polygon points="500,145 485,165 515,165" fill="white" opacity="0.8" />
        <polygon points="350,120 338,138 362,138" fill="white" opacity="0.6" />

        {/* Green valley */}
        <ellipse cx="400" cy="320" rx="500" ry="70" fill="#2D9B6E" />

        {/* Kurdish flag color accents — flowers in red, white, green */}
        {/* Red flowers (sor) */}
        <circle cx="100" cy="275" r="5" fill="#E85D75" />
        <circle cx="300" cy="280" r="4" fill="#E85D75" />
        <circle cx="550" cy="278" r="5" fill="#E85D75" />
        <circle cx="720" cy="276" r="4" fill="#E85D75" />
        {/* White flowers (spî) */}
        <circle cx="180" cy="278" r="4" fill="white" />
        <circle cx="430" cy="282" r="3" fill="white" />
        <circle cx="640" cy="275" r="4" fill="white" />
        {/* Stems */}
        {[100,180,300,430,550,640,720].map((x) => (
          <line key={x} x1={x} y1={x % 3 === 0 ? 275 : 278} x2={x} y2={295} stroke="#134533" strokeWidth="1.5" />
        ))}

        {/* Butterfly (Perperok) — Kurdish mascot */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="150,200;160,190;150,200" dur="5s" repeatCount="indefinite" />
          <ellipse cx="-10" cy="-4" rx="12" ry="8" fill="#E85D75" opacity="0.8">
            <animate attributeName="rx" values="12;8;12" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="-8" cy="4" rx="8" ry="6" fill="#F2A3B1" opacity="0.7">
            <animate attributeName="rx" values="8;5;8" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="10" cy="-4" rx="12" ry="8" fill="#E85D75" opacity="0.8">
            <animate attributeName="rx" values="12;8;12" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="8" cy="4" rx="8" ry="6" fill="#F2A3B1" opacity="0.7">
            <animate attributeName="rx" values="8;5;8" dur="0.6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="0" cy="0" rx="2" ry="9" fill="#7A2D3B" />
          <line x1="-3" y1="-9" x2="-7" y2="-16" stroke="#7A2D3B" strokeWidth="1" />
          <line x1="3" y1="-9" x2="7" y2="-16" stroke="#7A2D3B" strokeWidth="1" />
          <circle cx="-7" cy="-16" r="1.5" fill="#F5A623" />
          <circle cx="7" cy="-16" r="1.5" fill="#F5A623" />
        </g>

        {/* Second butterfly */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="650,170;640,160;650,170" dur="4s" repeatCount="indefinite" />
          <ellipse cx="-8" cy="-3" rx="9" ry="6" fill="#2D9B6E" opacity="0.7">
            <animate attributeName="rx" values="9;6;9" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="8" cy="-3" rx="9" ry="6" fill="#2D9B6E" opacity="0.7">
            <animate attributeName="rx" values="9;6;9" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="0" cy="0" rx="1.5" ry="7" fill="#134533" />
        </g>

        {/* "kurdi.ch" text */}
        <text x="400" y="305" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="16" fontWeight="800" fill="white" opacity="0.9">
          🦋 kurdi.ch — Kurdî Fêr Bibe
        </text>
      </svg>
    </div>
  );
}
