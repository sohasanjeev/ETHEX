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
  const heightClass = {
    sm: "h-6.5 sm:h-8.5",
    md: "h-9 sm:h-11",
    lg: "h-12 sm:h-14",
    xl: "h-16 sm:h-18",
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
