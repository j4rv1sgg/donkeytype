// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useContext } from 'react';
import styles from './TypeConfig.module.css';
import { ConfigContext } from '@/context/ConfigContext';
import { ConfigContextType } from '@/types/Config';
import LanguagePopup from './LanguagePopup';

type Props = {
  isVisible: boolean;
};

export default function TypeConfig({ isVisible }: Props) {
  const [config, updateConfig] = useContext(
    ConfigContext
  ) as ConfigContextType | null;

  const timeOptions = [15, 30, 60];
  return (
    <div className={styles.container}>
      <div
        className={styles.configContainer}
        style={!isVisible ? { opacity: 0, pointerEvents: 'none' } : {}}
      >
        {timeOptions.map((item, i) => (
          <span
            key={i}
            className={styles.configButton}
            onClick={() => updateConfig({ time: item })}
            style={{ color: item === config.time ? '#f2ce83' : 'inherit' }}
          >
            {item}
          </span>
        ))}
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ capitals: !config.capitals })}
          style={{ color: config.capitals ? '#f2ce83' : 'inherit' }}
        >
          capitals
        </span>
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ punctuation: !config.punctuation })}
          style={{ color: config.punctuation ? '#f2ce83' : 'inherit' }}
        >
          punctuation
        </span>
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ numbers: !config.numbers })}
          style={{ color: config.numbers ? '#f2ce83' : 'inherit' }}
        >
          numbers
        </span>
      </div>
      <div className={styles.languageContainer}>
        <LanguagePopup/>
      </div>
    </div>
  );
}
