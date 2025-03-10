import { createContext, useState, useContext } from "react";

const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  const [selectedMaster, setSelectedMaster] = useState(null);

  return (
    <MasterContext.Provider value={{ selectedMaster, setSelectedMaster }}>
      {children}
    </MasterContext.Provider>
  );
};

export const useMaster = () => useContext(MasterContext);
