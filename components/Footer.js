import styles from "./Footer.module.css";

export default function Footer() {
  console.log("IN FOOTER");
  return (
    <>
      <footer className={styles.footer}>
        Sisällön oikeudet | Artturi Patrakka ja Tatja Syrjämäki
      </footer>
    </>
  );
}
