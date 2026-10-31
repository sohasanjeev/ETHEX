import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showMotto?: boolean;
  theme?: "light" | "dark";
}

export const EuroCampusLogo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  theme = "light",
}) => {
  // 150% dimension scaling (+50% larger) for clear institutional presence
  const heightClass = {
    sm: "h-10 sm:h-12 max-w-[195px] sm:max-w-[250px]",
    md: "h-11 sm:h-13 max-w-[220px] sm:max-w-[275px]",
    lg: "h-13 sm:h-16 max-w-[260px] sm:max-w-[320px]",
    xl: "h-16 sm:h-20 max-w-[310px] sm:max-w-[380px]",
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/branding/euro_campus_official_logo.png"
        alt="EURO CAMPUS - मूल्यनिष्ठाः अनुशासनेन उत्कर्षाय!"
        className={`${heightClass} w-auto object-contain filter contrast-105 ${
          theme === "dark"
            ? "bg-white/95 p-1 rounded-xl shadow-xs"
            : ""
        }`}
      />
    </div>
  );
};

export default EuroCampusLogo;
