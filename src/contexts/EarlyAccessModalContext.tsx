import { createContext, useContext, useState, ReactNode } from "react";
import { EarlyAccessModal } from "@/components/ksi/EarlyAccessModal";

interface EarlyAccessModalContextValue {
  openModal: () => void;
}

const EarlyAccessModalContext = createContext<EarlyAccessModalContextValue>({ openModal: () => {} });

export function EarlyAccessModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <EarlyAccessModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <EarlyAccessModal open={open} onClose={() => setOpen(false)} />
    </EarlyAccessModalContext.Provider>
  );
}

export function useEarlyAccessModal() {
  return useContext(EarlyAccessModalContext);
}
