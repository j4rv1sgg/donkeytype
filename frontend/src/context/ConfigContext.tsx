import UseConfig, { defaultConfig } from '@/hooks/UseConfig';
import { ConfigContextType } from '@/types/Config';
import { createContext } from 'react';

export const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
});

export const ConfigContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { config, updateConfig } = UseConfig('config');
  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
export default ConfigContextProvider;
