import Link from "next/link";

import { getLinkPath } from "@/lib/menus";

import { NavigationAnchor } from "../NavigationAnchor";
import { useRegions } from "../RegionsProvider";
import styles from "./BurgerMenu.module.css";
import { CollapseMenuProps } from "./CollapseMenu";

function SubCollapseMenu({ menuItem }: CollapseMenuProps) {
  const { currentChannel, currentLocale } = useRegions();

  return (
    <div className="mt-4">
      <NavigationAnchor menuItem={menuItem} className={styles["collapse-sub"]} />
      <div>
        <ul>
          {menuItem.children?.map((sub) => (
            <li key={sub.id} className={styles["menu-link"]}>
              <Link href={getLinkPath(sub, currentChannel.slug, currentLocale)} passHref>
                <a href="pass">{sub.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SubCollapseMenu;
