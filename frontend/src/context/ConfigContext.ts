import { defaultConfig } from '@/hooks/UseConfig';
import { ConfigContextType } from '@/types/Config';
import { createContext } from 'react';

export const ConfigContext = createContext<ConfigContextType>({config: defaultConfig, updateConfig: () => {}});
