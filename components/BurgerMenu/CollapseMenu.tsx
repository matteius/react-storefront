import { MenuItemWithChildrenFragment } from "@/saleor/api";

import { NavigationAnchor } from "../NavigationAnchor";
import styles from "./BurgerMenu.module.css";
import SubCollapseMenu from "./SubCollapseMenu";

export interface CollapseMenuProps {
  menuItem: MenuItemWithChildrenFragment;
}

export function CollapseMenu({ menuItem }: CollapseMenuProps) {
  return (
    <div className={styles.collapse}>
      <NavigationAnchor menuItem={menuItem} className={styles["collapse-main"]} />
      <div>
        {menuItem.children?.map((item) => (
          <SubCollapseMenu menuItem={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default CollapseMenu;
