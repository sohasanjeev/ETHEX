import React from "react";
import EuroCampusLogo from "./EuroCampusLogo";
import EthexLogo from "./EthexLogo";
import Link from "next/link";

interface CombinedBrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  year?: string;
  href?: string;
  theme?: "light" | "dark";
  variant?: "inline" | "card";
}

export const CombinedBrandLogo: React.FC<CombinedBrandLogoProps> = ({
  className = "",
  size = "md",
  year = "2026",
  href = "/",
  theme = "light",
  variant = "inline",
}) => {
  const content = (
    <div
      className={`inline-flex items-center gap-2 sm:gap-3.5 transition-all max-w-full ${
        variant === "card"
          ? "bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg"
          : ""
      } ${className}`}
    >
      {/* EURO CAMPUS Crest & Typography */}
      <EuroCampusLogo size={size} showMotto={size !== "sm"} theme={variant === "card" ? "light" : theme} />

      {/* Elegant Vertical Divider */}
      <div
        className={`${
          size === "sm" ? "h-5 sm:h-6.5" : "h-6 sm:h-8"
        } w-[1px] flex-shrink-0 ${
          theme === "dark" && variant !== "card" ? "bg-white/20" : "bg-slate-300"
        }`}
      ></div>

      {/* Official ETHEX Logo */}
      <EthexLogo size={size} year={year} theme={variant === "card" ? "light" : theme} />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-95 transition-opacity focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
export default CombinedBrandLogo;
