"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const { setUser, clearIsAuth } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuth();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuth]);
  return children;
}
