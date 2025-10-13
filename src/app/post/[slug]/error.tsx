"use client";

import Link from "next/link";
import styles from "./error.module.scss";

export default function Error() {
  return (
    <div className={styles.error}>
      <h2>Ops... Algo deu errado!</h2>
      <Link href="/">Voltar para a página inicial</Link>
    </div>
  );
}
