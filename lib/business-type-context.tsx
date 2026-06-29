"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type BusinessType = "services" | "products" | "both";

type BusinessTypeContextValue = {
  businessType: BusinessType;
  setBusinessType: (t: BusinessType) => void;
};

const BusinessTypeContext = createContext<BusinessTypeContextValue>({
  businessType: "services",
  setBusinessType: () => {},
});

export function BusinessTypeProvider({ children }: { children: ReactNode }) {
  const [businessType, setBusinessTypeState] = useState<BusinessType>("services");

  useEffect(() => {
    const stored = localStorage.getItem("khula_business_type") as BusinessType | null;
    if (stored === "services" || stored === "products" || stored === "both") {
      setBusinessTypeState(stored);
    }
  }, []);

  const setBusinessType = (t: BusinessType) => {
    setBusinessTypeState(t);
    localStorage.setItem("khula_business_type", t);
  };

  return (
    <BusinessTypeContext.Provider value={{ businessType, setBusinessType }}>
      {children}
    </BusinessTypeContext.Provider>
  );
}

export function useBusinessType() {
  return useContext(BusinessTypeContext);
}
