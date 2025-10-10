"use client";

import Link from "next/link";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./MobileMenuOverlay.module.css";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuOverlay({ isOpen, onClose }: Props) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === `Escape`) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      if (isOpen) onClose();
    }
    prevPathRef.current = pathname;
  }, [pathname, isOpen, onClose]);

  return (
    <div
      className={`${css.overlay} ${isOpen ? css.open : css.closed}`}
      onClick={onClose}
      role="dialog"
      aria-modal={isMounted ? isOpen : false}
      aria-hidden={isMounted ? !isOpen : true}
    >
      <div className={css.menu} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close menu"
        >
          ✕
        </button>

        <ul className={css.list}>
          <li>
            <Link href="/" onClick={onClose}>
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <TagsMenu variant="mobile" />
            </li>
          )}
          <li>
            <AuthNavigation variant="mobile" />
          </li>
        </ul>
      </div>
    </div>
  );
}
