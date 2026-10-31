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
    sm: "h-7 sm:h-8 max-w-[135px] sm:max-w-[170px]",
    md: "h-8 sm:h-9.5 max-w-[155px] sm:max-w-[195px]",
    lg: "h-10 sm:h-12 max-w-[185px] sm:max-w-[230px]",
    xl: "h-12 sm:h-14 max-w-[220px] sm:max-w-[270px]",
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
