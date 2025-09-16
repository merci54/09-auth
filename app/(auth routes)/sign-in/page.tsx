"use client";

import { useState } from "react";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { AuthProps } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";

export default function SignInPage() {
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as AuthProps;
      const res = await login(values);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data.error ?? error.message ?? "Some error...");
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
