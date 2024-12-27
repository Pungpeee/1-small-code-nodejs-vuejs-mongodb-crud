"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type DataType = {};

interface ContextProps {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<ContextProps>({
  formData: {},
  setFormData: (): void => {}, // get data from api user info
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<{} | DataType>({});

  const [selectCustomerAddress, setSelectCustomerAddress] = useState<
    [] | DataType
  >([]);
  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
