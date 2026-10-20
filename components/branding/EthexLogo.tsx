import React from "react";

interface EthexLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  year?: string;
}

export const EthexLogo: React.FC<EthexLogoProps> = ({
  className = "",
  size = "md",
  year = "2026",
}) => {
  const iconSizes = {
    sm: { h: 32, font: "text-lg", sub: "text-[0.55rem]", badge: "text-[0.6rem] px-1.5" },
    md: { h: 42, font: "text-2xl", sub: "text-[0.65rem]", badge: "text-[0.7rem] px-2 py-0.5" },
    lg: { h: 54, font: "text-3xl", sub: "text-[0.75rem]", badge: "text-[0.8rem] px-2.5 py-0.5" },
    xl: { h: 70, font: "text-4xl", sub: "text-[0.9rem]", badge: "text-[0.95rem] px-3 py-1" },
  }[size];

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-1.5 leading-none">
        {/* Dynamic Stylized Swoosh & E */}
        <div className="relative flex items-baseline">
          <svg
            className="inline-block mr-1"
            width={size === "sm" ? 18 : size === "md" ? 24 : 32}
            height={size === "sm" ? 18 : size === "md" ? 24 : 32}
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M4 28L12 4L16 4L8 28H4Z"
              fill="#F59E0B"
            />
            <path
              d="M10 28L18 4L22 4L14 28H10Z"
              fill="#38BDF8"
            />
            <path
              d="M16 28L24 4L28 4L20 28H16Z"
              fill="#1D4ED8"
            />
          </svg>

          {/* Main "ETHEX" Typography */}
          <div className="flex items-center tracking-tighter">
            <span className={`font-black italic text-euro-navy ${iconSizes.font}`}>
              E
            </span>
            <span className={`font-black italic text-euro-navy ${iconSizes.font} relative`}>
              {/* Graduation cap perched on the T */}
              <svg
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 text-euro-gold drop-shadow-sm"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 19.94 8.13 22 12 22C15.87 22 19 19.94 19 17.18V13.18L12 17L5 13.18Z" />
              </svg>
              T
            </span>
            <span className={`font-black italic text-euro-navy ${iconSizes.font}`}>
              HEX
            </span>
          </div>

          {/* Edition / Year Badge */}
          <span className={`ml-2 font-black rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-euro-navy border border-amber-600/30 shadow-sm ${iconSizes.badge}`}>
            {year}
          </span>
        </div>
      </div>

      {/* Full Form Subtitle with underline bar */}
      <div className="flex items-center gap-1 mt-0.5 w-full">
        <div className="h-[2px] w-3 bg-euro-sky rounded-full"></div>
        <span className={`font-bold tracking-widest text-euro-deep uppercase ${iconSizes.sub}`}>
          EURO TALENT HUNT EXAM
        </span>
        <div className="h-[2px] flex-grow bg-euro-royal/30 rounded-full"></div>
      </div>
    </div>
  );
};
export default EthexLogo;
