"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import css from "@/components/Loader/Loader.module.css";

export default function Loading() {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <div className={`${css.loader} ${css.modalLoad}`}></div>
    </Modal>
  );
}
