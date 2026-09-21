import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverse?: boolean;
  compact?: boolean;
};

export function BrandMark({ className }: { className?: string }) {
  return <Image aria-hidden="true" className={className} src="/brand/conectar-mark-green.svg" alt="" width={460} height={360} />;
}

export function Logo({ className, inverse = false, compact = false }: LogoProps) {
  const fullLogoSource = inverse ? "/brand/conectar-network-white.svg" : "/brand/conectar-network-green.svg";
  const markSource = inverse ? "/brand/conectar-mark-white.svg" : "/brand/conectar-mark-green.svg";
  if (compact) return <Image className={cn("size-9 object-contain", className)} src={markSource} alt="Conectar" width={460} height={360} />;
  return <Image className={cn("h-auto w-36 object-contain", className)} src={fullLogoSource} alt="Conectar Network" width={961} height={609} priority />;
}
