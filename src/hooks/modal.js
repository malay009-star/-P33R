import { ModalContext } from "@contexts/index";

import { useContext } from "react";

export default function useModals() {
  const {
    login,
    setLogin,
    register,
    setRegister,
    setOtpModal,
    otpModal,
    showOtpModal,
    forget,
    setForget,
  } = useContext(ModalContext);

  return {
    login,
    setLogin,
    register,
    setRegister,
    setOtpModal,
    otpModal,
    showOtpModal,
    forget,
    setForget,
  };
}
