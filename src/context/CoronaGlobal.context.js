import React, { createContext, useContext } from "react";

import {
  useCoronaGlobal,
  useCoronaGlobalGreen,
  useCoronaGlobalRed
} from "../hooks/index";

export const CoronaGlobalContext = createContext();

export const CoronaGlobalProvider = ({ children }) => {
  const {
    coronaGlobal,
    mergedData,
    countries,
    globalTotal
  } = useCoronaGlobal();
  const { coronaGlobalGreen, globalGreenTotal } = useCoronaGlobalGreen();
  const { coronaGlobalRed, globalRedTotal } = useCoronaGlobalRed();

  return (
    <CoronaGlobalContext.Provider
      value={{
        coronaGlobal,
        mergedData,
        countries,
        coronaGlobalRed,
        coronaGlobalGreen,
        globalTotal,
        globalGreenTotal,
        globalRedTotal
      }}
    >
      {children}
    </CoronaGlobalContext.Provider>
  );
};
export const useCoronaGlobalValues = () => useContext(CoronaGlobalContext);
