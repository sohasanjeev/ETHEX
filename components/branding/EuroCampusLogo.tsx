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
    sm: { icon: 32, title: "text-[0.95rem]", sub: "text-[0.7rem]" },
    md: { icon: 44, title: "text-[1.12rem]", sub: "text-[0.8rem]" },
    lg: { icon: 56, title: "text-[1.35rem]", sub: "text-[0.95rem]" },
    xl: { icon: 72, title: "text-[1.65rem]", sub: "text-[1.15rem]" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Authentic EURO CAMPUS Shield Crest */}
      <img
        src="/branding/euro_campus_shield.png"
        alt="EURO Campus Crest"
        className="flex-shrink-0 object-contain drop-shadow-sm"
        style={{ height: `${dimensions.icon}px`, width: "auto" }}
      />

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-wider text-euro-navy uppercase leading-none ${dimensions.title}`}>
          EURO
        </span>
        <span className={`font-bold tracking-widest text-euro-royal uppercase leading-tight ${dimensions.sub}`}>
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
