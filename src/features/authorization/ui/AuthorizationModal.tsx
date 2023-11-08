import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { isActive, closeModal } from "../model/useAuthorizationModal";

import { Input, Modal } from "@shared/ui";
import { PasswordIcon, EmailIcon } from "@shared/ui/icons";
import { useFocus } from "@shared/lib/react";

import "./AuthorizationModal.scss";

const authSchema = yup.object().shape({
  email: yup.string().email("Некорректный Email").required("Укажите Email"),
  password: yup.string().required("Введите пароль"),
});

export const AuthorizationModal = () => {
  const modalOpenStatus = isActive();
  const [emailRef, setEmailFocus] = useFocus<HTMLInputElement>();

  const [formError, setFormError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authSchema,
    onSubmit: (values, { resetForm }) => {
      const { email, password } = values;
      console.log(`submit auth form: email:${email} password:${password}`);
      console.log(1);
      resetForm();
    },
  });

  useEffect(() => {
    console.log(modalOpenStatus);
    setEmailFocus();
  }, [modalOpenStatus]);

  const handleClose = () => {
    closeModal();
    formik.resetForm();
  };

  return (
    <Modal isActive={modalOpenStatus} closeModal={handleClose}>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          placeholder="Email"
          icon={<EmailIcon fill="currentColor" />}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          error={!!formik.errors.email}
          innerRef={emailRef}
          clear={formik.setFieldValue.bind(this, "email", "")}
        />
        <Input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          placeholder="Пароль"
          icon={<PasswordIcon fill="currentColor" />}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          error={!!formik.errors.password}
        />
        <button type="submit">Войти</button>
      </form>
    </Modal>
  );
};
