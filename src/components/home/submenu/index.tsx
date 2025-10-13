"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

import { X, Menu } from "lucide-react";
import { MenuProps } from "@/utils/menu.type";

interface SubMenuProp {
  menu: MenuProps;
}

export function Submenu({ menu }: SubMenuProp) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <section className={styles.submenu}>
      <div className={styles.submenuIcon} onClick={toggleMenu}>
        <Menu size={34} color="#121212" />
        Menu
      </div>

      <ul className={`${styles.ul} ${isOpen ? styles.open : ""}`}>
        {isOpen && (
          <button className={styles.closeButton}>
            <X size={34} color="#121212" onClick={toggleMenu} />
          </button>
        )}
        {menu.objects.map(item => (
          <li key={item.slug} onClick={() => setIsOpen(false)}>
            <Link href={`/post/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
