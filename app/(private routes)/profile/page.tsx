import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getMeServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Your personal profile data.",
  openGraph: {
    title: "Profile Page",
    description: "Your personal profile data.",
    url: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user?.avatar && (
            <Image
              src={user?.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
