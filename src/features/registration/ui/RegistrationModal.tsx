import { FC, useEffect, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { isActive, closeModal } from "../model/useRegistrationModal";

import { Input, Modal, Button } from "@shared/ui";
import { PasswordIcon, EmailIcon } from "@shared/ui/icons";
import { useFocus } from "@shared/lib/react";

const authSchema = yup.object().shape({
  email: yup.string().email("Некорректный Email").required("Укажите Email"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(10, "Минимальная длинна пароля - 8 символов"),
  confirmPassword: yup
    .string()
    .required("Подтвердите пароль")
    .min(10, "Минимальная длинна пароля - 8 символов")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

type RegistrationModalProps = {
  openAuthModal: () => void;
};

export const RegistrationModal: FC<RegistrationModalProps> = ({
  openAuthModal,
}) => {
  const modalOpenStatus = isActive();
  const [emailRef, setEmailFocus] = useFocus<HTMLInputElement>();

  const [apiError, setApiError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: authSchema,
    onSubmit: (values, { resetForm }) => {
      return new Promise(() => {
        setTimeout(() => {
          const { email, password, confirmPassword } = values;
          console.log(`submit reg form: email:${email} password:${password}`);
          resetForm();
        }, 2500);
      });
    },
  });

  useEffect(() => {
    modalOpenStatus && setEmailFocus();
  }, [modalOpenStatus]);

  const handleClose = () => {
    closeModal();
    formik.resetForm();
  };

  const changeToAuthModal = () => {
    handleClose();
    openAuthModal();
  };

  return (
    <Modal isActive={modalOpenStatus} closeModal={handleClose}>
      <header className="auth-header">
        <img src="./gen_tree_cropped.png" width={130} />
        <b>Genealogical Tree</b>
        <p>Регистрация</p>
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
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          value={formik.values.confirmPassword}
          placeholder="Подтвердите ароль"
          icon={<PasswordIcon fill="currentColor" />}
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          error={!!formik.errors.confirmPassword}
          clear={formik.setFieldValue.bind(this, "confirmPassword", "")}
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
        <br />
        <button onClick={changeToAuthModal} className="help-reg">
          Уже есть аккаунт? Войдите!
        </button>
      </form>
    </Modal>
  );
};
