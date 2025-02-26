import { createContext, useContext } from 'react';

const ContainerContext = createContext(null);

export const ContainerProvider = ({ container, children }) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};

export const useContainer = () => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return context;
};