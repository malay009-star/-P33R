// "use client";
// import { FaBell } from "react-icons/fa";
// import Modal from "../modal";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import Api from "@/api";

// const AnnouncementModal = ({ open, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendEmail = async () => {
//     if (!email) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     const res = await Api.sendEmail(
//       {
//         email,
//       },
//       setLoading
//     );

//     if (res?.error) {
//       toast.error(res?.error);
//       return;
//     }

//     if (typeof window !== "undefined") {
//       localStorage.setItem("email-enter", email);
//     }
//     toast.success("Thank you for signing up for our newsletter!");

//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-lg shadow-lg">
//         <div className="bg-red-500 text-white px-3 py-1 rounded-full mb-4">
//           P33R (peer) is Coming Soon
//         </div>
//         {/* <h1 className="text-2xl font-bold mb-2">PEER Is Here!</h1> */}
//         <p className="text-center mb-6 text-white">
//           Stay tuned for updates on our new features.
//         </p>
//         <div className="flex flex-col md:flex-row border rounded-lg md:rounded-full bg-slate-50 overflow-hidden">
//           <input
//             type="email"
//             placeholder="Enter your email address "
//             className="bg-none py-2 px-2 md:px-5 outline-none text-black"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button
//             className={
//               "flex items-center justify-center text-center bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg md:rounded-full hover:bg-gray-200 transition duration-300 " +
//               (loading ? " cursor-not-allowed opacity-50" : "")
//             }
//             onClick={() => sendEmail()}
//           >
//             <FaBell className="mr-2" />
//             <p>Notify me</p>
//           </button>
//           {/* <GradientButton text="Notify me" /> */}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default AnnouncementModal;

"use client";

import { FaBell } from "react-icons/fa";
import { useState, useCallback } from "react";
import Modal from "../modal";
import toast from "react-hot-toast";
import Api from "@/api";

const AnnouncementModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Memoize the validation function to avoid unnecessary re-creations
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Use useCallback to memoize the sendEmail function and avoid unnecessary re-renders
  const sendEmail = useCallback(async () => {
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // const res = await Api.sendEmail({ email }, setLoading);
    // if (res?.error) {
    //   toast.error(res.error);
    //   return;
    // }

    setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("email-enter", email);
      }

      toast.success("Thank you for signing up for our newsletter!");
      onClose();
    }, 1000);
  }, [email, onClose, validateEmail]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <div className="bg-red-500 text-white px-3 py-1 rounded-full mb-4">
          P33R (peer) is Coming Soon
        </div>
        <p className="text-center mb-6 text-white">
          Stay tuned for updates on our new features.
        </p>
        <div className="flex flex-col md:flex-row border rounded-lg md:rounded-full bg-slate-50 overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email address"
            className="py-2 px-2 md:px-5 outline-none text-black flex-grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <button
            className={`flex items-center justify-center text-center bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg md:rounded-full transition duration-300 ${
              loading ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"
            }`}
            onClick={sendEmail}
            disabled={loading}
          >
            <FaBell className="mr-2" />
            <p className="text-white">Notify me</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AnnouncementModal;
