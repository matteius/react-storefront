import Image from "next/image";
import Link from "next/link";

import { usePaths } from "@/lib/paths";

function Stamp() {
  const paths = usePaths();
  return (
    <div className="mt-px group block h-24 w-24 relative">
      <Link href={paths.$url()} passHref>
        <a href="pass">
          <Image src="/logo.png" alt="www.MattsCoinage.com" layout="fill" />
        </a>
      </Link>
    </div>
  );
}

export default Stamp;
