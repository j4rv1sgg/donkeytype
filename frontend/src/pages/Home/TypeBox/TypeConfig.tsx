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
    <div
      className={styles.container}
      style={!isVisible ? { opacity: 0, pointerEvents: 'none' } : {}}
    >
      <div className={styles.configContainer}>
        {timeOptions.map((item, i) => (
          <span
            key={i}
            className={styles.configButton}
            onClick={() => updateConfig({ time: item })}
            style={{ color: item === config.time ? 'var(--main-color)' : 'inherit' }}
          >
            {item}
          </span>
        ))}
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ capitals: !config.capitals })}
          style={{ color: config.capitals ? 'var(--main-color)' : 'inherit' }}
        >
          capitals
        </span>
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ punctuation: !config.punctuation })}
          style={{ color: config.punctuation ? 'var(--main-color)' : 'inherit' }}
        >
          punctuation
        </span>
        <span
          className={styles.configButton}
          onClick={() => updateConfig({ numbers: !config.numbers })}
          style={{ color: config.numbers ? 'var(--main-color)' : 'inherit' }}
        >
          numbers
        </span>
      </div>
      <div className={styles.languageContainer}>
        <LanguagePopup />
      </div>
    </div>
  );
}
