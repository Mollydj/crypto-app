import { createContext, useContext } from "react";
import type { MessageInstance } from "antd/es/message/interface";

export const MessageContext = createContext<MessageInstance | null>(null);

export const useMessageApi = (): MessageInstance => {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessageApi must be used within MessageProvider");
  return ctx;
};
