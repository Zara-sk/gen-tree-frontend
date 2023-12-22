import { FC, useEffect } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { isMobile } from "react-device-detect";

import { isActive, closeModal } from "../model/useAuthorizationModal";

import { Input, Modal, Button } from "@shared/ui";
import { PasswordIcon, EmailIcon } from "@shared/ui/icons";
import { useFocus } from "@shared/lib/react";

import "./AuthorizationModal.scss";
import { setUser } from "@entities/session";

const authSchema = yup.object().shape({
  email: yup.string().email("Некорректный Email").required("Укажите Email"),
  password: yup.string().required("Введите пароль"),
});

type AuthorizationModalProps = {
  openRegModal: () => void;
};

export const AuthorizationModal: FC<AuthorizationModalProps> = ({
  openRegModal,
}) => {
  const modalOpenStatus = isActive();
  const [emailRef, setEmailFocus] = useFocus<HTMLInputElement>();

  // const [apiError, setApiError] = useState<string>("");

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
          if (email == "zara.forgest@gmail.com" && password == "123") {
            setUser({
              id: 0,
              family_id: 0,
              accessToken: "M0CK",
            });
            closeModal();
          }
          resetForm();
        }, 800);
      });
    },
  });

  useEffect(() => {
    modalOpenStatus && !isMobile && setEmailFocus();
  }, [modalOpenStatus]);

  const handleClose = () => {
    closeModal();
    formik.resetForm();
  };

  const changeToRegModal = () => {
    handleClose();
    openRegModal();
  };

  return (
    <Modal isActive={modalOpenStatus} closeModal={handleClose}>
      <img className="background" src="./lowpoly_gen_tree.jpg" />
      <img className="bg-shadow" src="./lowpoly_gen_tree.jpg" />
      <div className="bg-linear"></div>
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <header className="auth-header">
          <p>Авторизация</p>
        </header>
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
        {/* <span data-for="email" className="field-error">
          {formik.errors.email}
        </span> */}
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
        {/* <span data-for="email" className="field-error">
          {formik.errors.password}
        </span> */}
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
        <button onClick={changeToRegModal} className="help-reg">
          Нет аккаунта? Зарегистрируйтесь!
        </button>
      </form>
    </Modal>
  );
};
