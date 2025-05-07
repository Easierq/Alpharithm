import styles from "./footer.module.css";

import Image from "next/image";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>&copy; {new Date().getFullYear()} </p>
        <p className={styles.logo}>Alpharithm</p>
      </div>
    </div>
  );
};
