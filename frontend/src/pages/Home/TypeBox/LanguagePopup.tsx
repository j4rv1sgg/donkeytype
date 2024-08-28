/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { ConfigContext } from '@/context/ConfigContext';
import { ConfigContextType } from '@/types/Config';
import { useContext, useEffect, useState } from 'react';
import styles from './LangugagePopup.module.css';
import Popup from '@/components/PopUp';
import { getAviableWordSets } from '@/services/wordsServices';
import { Earth } from 'lucide-react';

export default function LanguagePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, updateConfig] = useContext(
    ConfigContext
  ) as ConfigContextType | null;

  useEffect(() => {
    getAviableWordSets().then((res) => {
      setOptions(res?.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div
        className={styles.trigger}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Earth
          size={21}
        />
        {config.words}
      </div>
      <Popup show={isOpen} darkBg={true} onClose={() => setIsOpen(false)}>
        <h2>Word set</h2>
        {loading ? (
          <span>loading</span>
        ) : (
          <div className={styles.list}>
            {options.map((item, i) => {
              return (
                <li
                  key={i}
                  className={
                    config.words == item
                      ? styles.listItemActive
                      : styles.listItem
                  }
                  onClick={() => {
                    updateConfig({ words: item });
                    setIsOpen(false);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </div>
        )}
      </Popup>
    </>
  );
}
