import React from "react";
import EuroCampusLogo from "./EuroCampusLogo";
import EthexLogo from "./EthexLogo";
import Link from "next/link";

interface CombinedBrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  year?: string;
  href?: string;
}

export const CombinedBrandLogo: React.FC<CombinedBrandLogoProps> = ({
  className = "",
  size = "md",
  year = "2026",
  href = "/",
}) => {
  const content = (
    <div className={`inline-flex items-center gap-3 sm:gap-5 ${className}`}>
      {/* EURO CAMPUS Logo */}
      <EuroCampusLogo size={size} showMotto={size !== "sm"} />

      {/* Elegant Vertical Divider */}
      <div className="h-8 sm:h-10 w-[1.5px] bg-slate-300 dark:bg-slate-700"></div>

      {/* ETHEX Logo */}
      <EthexLogo size={size} year={year} />
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
