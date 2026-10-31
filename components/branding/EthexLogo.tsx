import React from "react";

interface EthexLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  year?: string;
  theme?: "light" | "dark";
  height?: number;
}

export const EthexLogo: React.FC<EthexLogoProps> = ({
  className = "",
  size = "md",
  year = "2026",
  theme = "light",
  height,
}) => {
  const heightMap = {
    sm: 36,
    md: 48,
    lg: 68,
    xl: 92,
    hero: 125,
  }[size];

  const actualHeight = height || heightMap;

  // In dark theme without white background, dark navy text needs contrast
  const filterStyle =
    theme === "dark"
      ? "brightness-125 drop-shadow-[0_2px_12px_rgba(255,255,255,0.45)]"
      : "drop-shadow-[0_2px_8px_rgba(0,102,255,0.15)]";

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      {/* Authentic High-Resolution Transparent ETHEX Official Logo */}
      <img
        src="/branding/ethex_logo_official_transparent.png"
        alt={`ETHEX ${year} - EURO TALENT HUNT EXAM`}
        className={`object-contain max-w-full transition-transform duration-300 hover:scale-102 ${filterStyle} ${
          size === 'sm' ? 'h-6.5 sm:h-9' : ''
        }`}
        style={size === 'sm' ? { width: 'auto' } : { height: `${actualHeight}px`, width: 'auto' }}
      />
    </div>
  );
};

export default EthexLogo;
