"use client";

import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";
import Hamburger from "hamburger-react";
import { useState } from "react";
import MobileMenuOverlay from "../MobileMenuOverlay/MobileMenuOverlay";

export default function Header() {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <div className={css.mobileNav}>
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>

        <ul className={`${css.navigation} ${css.desktopNav}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <TagsMenu variant="desktop" />
            </li>
          )}
          <li>
            <AuthNavigation variant="desktop" />
          </li>
        </ul>
      </nav>

      {/* Оверлей всегда в DOM — виден только когда isOpen */}
      <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
