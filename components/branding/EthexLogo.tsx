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
  const heightMap = {
    sm: 36,
    md: 46,
    lg: 60,
    xl: 78,
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      {/* Authentic ETHEX Official Logo */}
      <img
        src="/branding/ethex_logo_official.png"
        alt={`ETHEX ${year} - EURO TALENT HUNT EXAM`}
        className="object-contain drop-shadow-sm max-w-full"
        style={{ height: `${heightMap}px`, width: "auto" }}
      />
    </div>
  );
};
export default EthexLogo;
