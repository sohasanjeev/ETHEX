import React from "react";

interface EthexLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  year?: string;
  theme?: "light" | "dark";
}

export const EthexLogo: React.FC<EthexLogoProps> = ({
  className = "",
  size = "md",
  year = "2026",
  theme = "light",
}) => {
  const heightMap = {
    sm: 36,
    md: 46,
    lg: 60,
    xl: 78,
  }[size];

  // In dark theme without white background, dark navy text needs contrast
  const filterStyle = theme === "dark" ? "brightness-125 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" : "drop-shadow-sm";

  return (
    <div className={`flex items-center ${className}`}>
      {/* Authentic Transparent ETHEX Official Logo */}
      <img
        src="/branding/ethex_logo_official_transparent.png"
        alt={`ETHEX ${year} - EURO TALENT HUNT EXAM`}
        className={`object-contain max-w-full ${filterStyle}`}
        style={{ height: `${heightMap}px`, width: "auto" }}
      />
    </div>
  );
};
export default EthexLogo;
