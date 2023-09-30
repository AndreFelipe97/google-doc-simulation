import { ReactNode, createContext, useEffect } from "react";
import React, { useState } from "react";

interface BreadcrumbsContextType {
  items: Array<string>;
  setBreadcrumbsType: (items: Array<string>) => void;
}

export const BreadcrumbsContext = createContext({} as BreadcrumbsContextType);

interface BreadcrumbsProviderProps {
  children: ReactNode;
}

function BreadcrumbsProvider({ children }: BreadcrumbsProviderProps) {
  const [items, setItems] = useState<Array<string>>([]);

  function setBreadcrumbsType(items: Array<string>) {
    setItems(items)
  }

  return (
    <BreadcrumbsContext.Provider value={{ items, setBreadcrumbsType }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export default BreadcrumbsProvider;
