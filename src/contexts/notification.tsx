import { ReactNode, createContext, useEffect } from "react";
import React, { useState } from "react";

type NotificationType = 'success' | 'error' | null;

interface NotificationContextType {
  state: NotificationType;
  message: string;
  description: string;
  setNotificationType: (type: NotificationType) => void;
}

export const NotificationContext = createContext({} as NotificationContextType);

interface NotificationProviderProps {
  children: ReactNode;
}

function NotificationProvider({ children }: NotificationProviderProps) {
  const [state, setState] = useState<NotificationType>(null);
  const [message, setMessage] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function setNotificationType(type: NotificationType) {
    setState(type)
    switch (type) {
      case 'success':
        setMessage('Cadastrado com sucesso!');
        setDescription('Seu arquivo foi cadastrado com sucesso!');
        break;
      case 'error':
        setMessage('Não foi possível cadastrar!');
        setDescription('Seu arquivo não foi cadastrado verifique se as informações estão corretas');
        break;
      default:
        console.log('Error');
    }
  }

  return (
    <NotificationContext.Provider value={{ state, message, description, setNotificationType }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
