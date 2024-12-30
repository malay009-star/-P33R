// "use client";
// const LoginContent = dynamic(() =>
//   import("@/components/auth/login", {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   })
// );
// const ForgetPasswordContent = dynamic(() =>
//   import("@/components/auth/forgetPassword", {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   })
// );

// const SignUpContent = dynamic(() =>
//   import("@/components/auth/signup", {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   })
// );
// import OtpModal from "@/components/auth/otp";
// import AnnouncementModal from "@/components/home/coming-soon";
// import dynamic from "next/dynamic";
// import React, { useEffect, useState } from "react";

// export const ModalContext = React.createContext();

// const ModalProvider = ({ children }) => {
//   const [login, setLogin] = useState(false);
//   const [register, setRegister] = useState(false);
//   const [forget, setForget] = useState(false);
//   const [otpModal, setOtpModal] = useState(false);
//   const [anoc, setAnoc] = useState(false);
//   const [phoneData, setPhoneData] = useState({});

//   const showOtpModal = (data) => {
//     setOtpModal(true);
//     setPhoneData(data);
//   };

//   useEffect(() => {
//     // get email-enter from localstorage
//     const hasEnterEmail =
//       typeof window !== "undefined" && localStorage.getItem("email-enter");

//     console.log("hasEnterEmail", hasEnterEmail);

//     if (!hasEnterEmail) {
//       setTimeout(() => {
//         setAnoc(true);
//       }, 1000);
//     }
//   }, []);

//   return (
//     <ModalContext.Provider
//       value={{
//         login,
//         setLogin,
//         register,
//         setRegister,
//         forget,
//         setForget,
//         otpModal,
//         setOtpModal,
//         showOtpModal,
//         phoneData,
//       }}
//     >
//       {children}
//       {login && <LoginContent open={login} onClose={() => setLogin(false)} />}
//       {register && (
//         <SignUpContent open={register} onClose={() => setRegister(false)} />
//       )}
//       {forget && (
//         <ForgetPasswordContent open={forget} onClose={() => setForget(false)} />
//       )}
//       {otpModal && (
//         <OtpModal
//           open={otpModal}
//           onClose={() => setOtpModal(false)}
//           phoneData={phoneData}
//         />
//       )}
//       {anoc && <AnnouncementModal open={anoc} onClose={() => setAnoc(false)} />}
//     </ModalContext.Provider>
//   );
// };

// export default ModalProvider;

"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback, useMemo } from "react";

// Dynamically load components
const LoginContent = dynamic(() => import("@/components/auth/login"), {
  ssr: false,
});
const ForgetPasswordContent = dynamic(
  () => import("@/components/auth/forgetPassword"),
  { ssr: false }
);
const SignUpContent = dynamic(() => import("@/components/auth/signup"), {
  ssr: false,
});
const OtpModal = dynamic(() => import("@/components/auth/otp"), { ssr: false });
const AnnouncementModal = dynamic(
  () => import("@/components/home/coming-soon"),
  { ssr: false }
);

export const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  // States
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [forget, setForget] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [anoc, setAnoc] = useState(false);
  const [phoneData, setPhoneData] = useState({});

  // Show OTP Modal Handler
  const showOtpModal = useCallback((data) => {
    setOtpModal(true);
    setPhoneData(data);
  }, []);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      login,
      setLogin,
      register,
      setRegister,
      forget,
      setForget,
      otpModal,
      setOtpModal,
      showOtpModal,
      phoneData,
    }),
    [login, register, forget, otpModal, showOtpModal, phoneData]
  );

  useEffect(() => {
    // Async function to check localStorage and update state
    const checkLocalStorage = async () => {
      const hasEnterEmail =
        typeof window !== "undefined" && localStorage.getItem("email-enter");

      if (!hasEnterEmail) {
        setTimeout(() => {
          setAnoc(true);
        }, 1000);
      }
    };

    checkLocalStorage();
  }, []);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {login && <LoginContent open={login} onClose={() => setLogin(false)} />}
      {register && (
        <SignUpContent open={register} onClose={() => setRegister(false)} />
      )}
      {forget && (
        <ForgetPasswordContent open={forget} onClose={() => setForget(false)} />
      )}
      {otpModal && (
        <OtpModal
          open={otpModal}
          onClose={() => setOtpModal(false)}
          phoneData={phoneData}
        />
      )}
      {anoc && <AnnouncementModal open={anoc} onClose={() => setAnoc(false)} />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
