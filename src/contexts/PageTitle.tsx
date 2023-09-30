import { ReactNode, createContext, useEffect } from "react";
import React, { useState } from "react";

interface TitlePageContext {
  title: string;
  setTitlePage: (title: string) => void;
}

export const TitlePageContext = createContext({} as TitlePageContext);

interface TitlePageProviderProps {
  children: ReactNode;
}

function TitlePageProvider({ children }: TitlePageProviderProps) {
  const [title, setTitle] = useState<string>('');

  function setTitlePage(title: string) {
    setTitle(title)
  }

  return (
    <TitlePageContext.Provider value={{ title, setTitlePage }}>
      {children}
    </TitlePageContext.Provider>
  );
}

export default TitlePageProvider;
