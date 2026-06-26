interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const textSizes = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  const iconSize = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-[#0D7A4E]";
  const tagColor = variant === "light" ? "text-[#A7D7BF]" : "text-[#64748B]";

  return (
    <div className="flex items-center gap-2.5">
      <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill={variant === "light" ? "rgba(255,255,255,0.15)" : "#E8F5EE"} />
        {/* Stem */}
        <path d="M20 30 L20 18" stroke={variant === "light" ? "#FFFFFF" : "#0D7A4E"} strokeWidth="2.5" strokeLinecap="round" />
        {/* Left leaf */}
        <path d="M20 22 C16 20 12 16 13 11 C16 12 20 16 20 22Z" fill={variant === "light" ? "#FFFFFF" : "#0D7A4E"} />
        {/* Right leaf */}
        <path d="M20 18 C24 16 28 12 27 7 C24 8 20 12 20 18Z" fill={variant === "light" ? "rgba(255,255,255,0.7)" : "#15A86A"} />
        {/* Root dots */}
        <circle cx="17" cy="31.5" r="1.5" fill={variant === "light" ? "rgba(255,255,255,0.5)" : "#A7D7BF"} />
        <circle cx="23" cy="31.5" r="1.5" fill={variant === "light" ? "rgba(255,255,255,0.5)" : "#A7D7BF"} />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-bold tracking-tight ${textSizes[size]} ${textColor}`}>KHULA</span>
        <span className={`text-[10px] uppercase tracking-widest font-medium ${tagColor}`}>CRM</span>
      </div>
    </div>
  );
}
