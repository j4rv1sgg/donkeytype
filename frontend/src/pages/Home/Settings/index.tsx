// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { ConfigContext } from '@/context/ConfigContext';
import { ConfigContextType } from '@/types/Config';
import { useContext, useState } from 'react';
import styles from './Settings.module.css';
import Popup from '@/components/PopUp';
import Toggle from '@/components/Toggle';
import { Settings } from 'lucide-react';

export default function Settnigs() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, updateConfig] = useContext(
    ConfigContext
  ) as ConfigContextType | null;
  
  const toggleSetting = () => {
    updateConfig({ liveWPM: !config.liveWPM });
  };
  return (
    <>
      <Settings
       className={styles.icon}
       height={26}
       width={26}
       color='var(--sub-color)'
       onClick={() => {
        setIsOpen(true);
      }}/>
      <Popup show={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Settings</h2>
        <div className={styles.list}>
          <div className={styles.listItem}>
            <span>Live WPM</span>
            <Toggle state={config.liveWPM} cb={toggleSetting}/>
          </div>
        </div>
      </Popup>
    </>
  );
}
