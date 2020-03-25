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
    globalTotal,
    dailyOrangeTotal,
    lastUpdate
  } = useCoronaGlobal();
  const {
    coronaGlobalGreen,
    globalGreenTotal,
    dailyGreenTotal
  } = useCoronaGlobalGreen();
  const {
    coronaGlobalRed,
    globalRedTotal,
    dailyRedTotal
  } = useCoronaGlobalRed();

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
        globalRedTotal,
        dailyRedTotal,
        dailyGreenTotal,
        dailyOrangeTotal,
        lastUpdate
      }}
    >
      {children}
    </CoronaGlobalContext.Provider>
  );
};
export const useCoronaGlobalValues = () => useContext(CoronaGlobalContext);
