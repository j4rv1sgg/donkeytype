import { StatusContextType } from '@/types/Status';
import { createContext } from 'react';

export const StatusContext = createContext<StatusContextType>({} as StatusContextType);
