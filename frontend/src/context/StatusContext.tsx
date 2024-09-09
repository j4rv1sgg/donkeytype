import { Status, StatusContextType } from '@/types/Status';
import { createContext, useState } from 'react';

export const StatusContext = createContext<StatusContextType>(
  {} as StatusContextType
);

export const StatusContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState<Status>('waiting');
  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};
export default StatusContextProvider;
