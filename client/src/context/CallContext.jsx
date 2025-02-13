import { createContext, useContext, useState } from "react";

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [callStatus, setCallStatus] = useState("No Active Call");

  return (
    <CallContext.Provider value={{ callStatus, setCallStatus }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => useContext(CallContext);



