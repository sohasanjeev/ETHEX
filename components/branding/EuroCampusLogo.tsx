import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showMotto?: boolean;
}

export const EuroCampusLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showMotto = true,
}) => {
  const dimensions = {
    sm: { h: 36, w: 120, icon: 28 },
    md: { h: 48, w: 160, icon: 38 },
    lg: { h: 64, w: 210, icon: 52 },
    xl: { h: 80, w: 260, icon: 66 },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* EURO CAMPUS Shield Crest */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-sm"
      >
        {/* Shield Outer Gold Border */}
        <path
          d="M50 5L92 22V55C92 82 50 105 50 105C50 105 8 82 8 55V22L50 5Z"
          fill="#0C1B3D"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Inner Shield Accent */}
        <path
          d="M50 12L85 26V54C85 76 50 96 50 96C50 96 15 76 15 54V26L50 12Z"
          fill="#142852"
        />
        {/* Mortarboard / Graduation Cap */}
        <path
          d="M50 26L74 38L50 50L26 38L50 26Z"
          fill="#F59E0B"
        />
        <path
          d="M32 43V54C32 58 40 62 50 62C60 62 68 58 68 54V43L50 52L32 43Z"
          fill="#FBBF24"
        />
        <path
          d="M71 40V56"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="71" cy="58" r="2" fill="#F59E0B" />

        {/* Greco-Roman Columns / Pillars */}
        <rect x="30" y="66" width="7" height="22" rx="1" fill="#F59E0B" />
        <rect x="42" y="66" width="7" height="22" rx="1" fill="#F59E0B" />
        <rect x="54" y="66" width="7" height="22" rx="1" fill="#F59E0B" />
        <rect x="66" y="66" width="7" height="22" rx="1" fill="#F59E0B" />
        {/* Base Pedestal */}
        <rect x="25" y="88" width="50" height="4" rx="1" fill="#F59E0B" />
      </svg>

      {/* Typography */}
      <div className="flex flex-col">
        <span className="font-extrabold tracking-wider text-euro-navy uppercase leading-none text-[1.1rem]">
          EURO
        </span>
        <span className="font-bold tracking-widest text-euro-royal uppercase text-[0.85rem] leading-tight">
          CAMPUS
        </span>
        {showMotto && (
          <span className="text-[0.62rem] text-euro-amber font-medium tracking-tight mt-0.5 leading-none">
            मूल्यान्विताः अनुशासनेन उत्कर्षात् !
          </span>
        )}
      </div>
    </div>
  );
};
export default EuroCampusLogo;
