"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { menuTags } from "@/lib/api/clientApi";

type Props = {
  variant?: "desktop" | "mobile";
};

export default function TagsMenu({ variant = "desktop" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.menuContainer}>
      <button
        onClick={toggle}
        className={`${variant === "mobile" ? css.menuButtonMobile : css.menuButton}`}
      >
        ▾ Notes ▾
      </button>
      {isOpen && (
        <ul
          className={`${variant === "mobile" ? css.menuListMobile : css.menuList}`}
        >
          {menuTags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={toggle}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
