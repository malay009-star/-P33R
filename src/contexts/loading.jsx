"use client";
import Spinner from "@components/spinner";

import { createContext, useState } from "react";

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <Spinner asOverlay />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
