import Image from "next/image";
import Link from "next/link";

interface StampProps {
  width?: number;
  height?: number;
  className?: string;
}
import { usePaths } from "@/lib/paths";

function Stamp({ width = 24, height = 24, className = "" }: StampProps) {
  const paths = usePaths();
  return (
    <div className={`mt-px group block h-${height} w-${width} relative ${className}`}>
      <Link href={paths.$url()} passHref>
        <a href="pass">
          <Image src="/logo.png" alt="www.MattsCoinage.com" layout="fill" />
        </a>
      </Link>
    </div>
  );
}

export default Stamp;
