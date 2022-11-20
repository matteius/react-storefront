import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { getLinkPath } from "@/lib/menus";
import { usePaths } from "@/lib/paths";
import { useFooterMenuQuery } from "@/saleor/api";

import { Box } from "../Box";
import { useRegions } from "../RegionsProvider";
import styles from "./Footer.module.css";

export type FooterProps = HTMLAttributes<HTMLElement>;

export function Footer({ className, ...rest }: FooterProps) {
  const paths = usePaths();
  const { query, currentChannel, currentLocale } = useRegions();

  const { data, error } = useFooterMenuQuery({ variables: { ...query } });

  if (error) {
    console.error("Footer component error", error.message);
  }

  const menu = data?.menu?.items || [];

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <Box className={styles["footer-inner"]}>
        <div className="flex justify-between">
          <div className="flex-none mt-px group block h-24 w-24 relative grayscale">
            <Link href={paths.$url()} passHref>
              <a href="pass">
                <Image src="/logo.png" alt="www.MattsCoinage.com" layout="responsive" />
              </a>
            </Link>
          </div>
          <div className="justify-between">
            {menu.map((item) => (
              <div key={item?.id} className="text-left">
                {item?.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["menu-heading"]}
                  >
                    {item?.name}
                  </a>
                ) : (
                  <Link
                    href={getLinkPath(item, currentChannel.slug, currentLocale)}
                    passHref
                    legacyBehavior
                  >
                    <a href="pass" className={styles["menu-heading"]}>
                      {item?.name}
                    </a>
                  </Link>
                )}
                <ul className={styles.menu}>
                  {item?.children?.map((sub) => (
                    <li key={sub?.id}>
                      {sub?.url ? (
                        <a
                          href={sub.url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles["menu-link"]}
                          data-testid={`footerExternalLinks${sub?.name}`}
                        >
                          {sub?.name}
                        </a>
                      ) : (
                        <Link
                          href={getLinkPath(sub, currentChannel.slug, currentLocale)}
                          passHref
                          legacyBehavior
                        >
                          <a
                            href="pass"
                            className={styles["menu-link"]}
                            data-testid={`footerInternalLinks${sub?.name}`}
                          >
                            {sub?.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-main-3 flex-grow text-slate-800">
            © Copyright {new Date().getFullYear()} MattsCoinage
          </p>
        </div>
      </Box>
    </footer>
  );
}

export default Footer;
