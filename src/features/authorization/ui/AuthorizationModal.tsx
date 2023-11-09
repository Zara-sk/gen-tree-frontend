import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { isActive, closeModal } from "../model/useAuthorizationModal";

import { Input, Modal, Button } from "@shared/ui";
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
      return new Promise(() => {
        setTimeout(() => {
          const { email, password } = values;
          console.log(`submit auth form: email:${email} password:${password}`);
          resetForm();
        }, 2500);
      });
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
      <header className="auth-header">
        <img src="./gen_tree_cropped.png" width={130} />
        <b>Genealogical Tree</b>
        <p>Авторизация</p>
      </header>
      <br />
      <br />
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
          clear={formik.setFieldValue.bind(this, "password", "")}
        />
        <br />
        <Button
          disabled={
            !!formik.errors.email ||
            !!formik.errors.password ||
            !formik.values.email ||
            formik.isSubmitting
          }
          type="submit"
        >
          Войти
        </Button>
      </form>
    </Modal>
  );
};
