"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./SignInPage.module.css";
import toast from "react-hot-toast";

// схема валидации Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignInPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return (
    <main className={css.mainContent}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const res = await login(values);
            if (res) {
              setUser(res);
              router.push("/profile");
              toast.success("Log In successfully");
            } else {
              setStatus("Invalid email or password");
            }
          } catch (err) {
            const error = err as ApiError;
            setStatus(
              error.response?.data.error ?? error.message ?? "Some error..."
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className={css.form}>
            <h1 className={css.formTitle}>Sign in</h1>

            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className={css.input}
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={css.input}
              />
              <ErrorMessage
                name="password"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.actions}>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </div>

            {status && <p className={css.error}>{status}</p>}
          </Form>
        )}
      </Formik>
    </main>
  );
}
