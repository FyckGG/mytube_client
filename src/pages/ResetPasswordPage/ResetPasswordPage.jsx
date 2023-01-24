import React from "react";
import { ResetPasswordForm } from "../../components/ResetPasswordForm/ResetPasswordForm";
import styles from "./ResetPasswordPage.module.css";

export const ResetPasswordPage = () => {
  return (
    <div className={styles.reset_password_form}>
      <ResetPasswordForm />
    </div>
  );
};
