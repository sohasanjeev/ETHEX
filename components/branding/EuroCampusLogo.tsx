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
  showMotto = true,
  theme = "light",
}) => {
  const dimensions = {
    sm: { icon: 32, title: "text-[0.95rem]", sub: "text-[0.7rem]" },
    md: { icon: 44, title: "text-[1.12rem]", sub: "text-[0.8rem]" },
    lg: { icon: 56, title: "text-[1.35rem]", sub: "text-[0.95rem]" },
    xl: { icon: 72, title: "text-[1.65rem]", sub: "text-[1.15rem]" },
  }[size];

  const titleColor = theme === "dark" ? "text-white" : "text-euro-navy";
  const subColor = theme === "dark" ? "text-amber-400" : "text-euro-royal";
  const mottoColor = theme === "dark" ? "text-amber-300" : "text-amber-600";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Authentic Transparent EURO CAMPUS Shield Crest */}
      <img
        src="/branding/euro_campus_shield_transparent.png"
        alt="EURO Campus Crest"
        className="flex-shrink-0 object-contain drop-shadow-sm filter contrast-105"
        style={{ height: `${dimensions.icon}px`, width: "auto" }}
      />

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-black tracking-wider uppercase leading-none ${dimensions.title} ${titleColor}`}>
          EURO
        </span>
        <span className={`font-extrabold tracking-widest uppercase leading-tight ${dimensions.sub} ${subColor}`}>
          CAMPUS
        </span>
        {showMotto && (
          <span className={`text-[0.62rem] font-semibold tracking-tight mt-0.5 leading-none ${mottoColor}`}>
            मूल्यान्विताः अनुशासनेन उत्कर्षात् !
          </span>
        )}
      </div>
    </div>
  );
};
export default EuroCampusLogo;
