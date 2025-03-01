import { createContext, useContext } from 'react';

const ContainerContext = createContext(null);

const ContainerProvider = ({ container, children }) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};

const useContainer = () => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return context;
};

export {ContainerProvider, useContainer}