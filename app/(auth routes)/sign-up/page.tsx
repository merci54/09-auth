"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./SignUpPage.module.css";
import toast from "react-hot-toast";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignUpPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return (
    <main className={css.mainContent}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const { email, password } = values;
            const res = await register({ email, password });
            if (res) {
              setUser(res);
              router.push("/profile");
              toast.success("Sign Up successfully");
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
            <h1 className={css.formTitle}>Sign up</h1>

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

            <div className={css.formGroup}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={css.input}
              />
              <ErrorMessage
                name="confirmPassword"
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
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>

            {status && <p className={css.error}>{status}</p>}
          </Form>
        )}
      </Formik>
    </main>
  );
}
