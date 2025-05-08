import { Menu } from "../sidebar/sidebar";
import styles from "./navbar.module.css";

import Link from "next/link";

const routes = [
  { id: 1, title: "Managers", url: "/managers" },
  { id: 3, title: "Jobs", url: "/jobs" },
  { id: 4, title: "Actions", url: "/forms" },
  { id: 5, title: "Templates", url: "/form-templates" },
  { id: 6, title: "Response", url: "/forms-responses" },
  { id: 7, title: "Links", url: "/form-links" },
];

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Alpharithm
        </Link>
        <div className={styles.wrapper}>
          <div className={styles.links}>
            {routes.map((item) => (
              <Link href={item.url} key={item.id} className={styles.link}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className={styles.menu}>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};
