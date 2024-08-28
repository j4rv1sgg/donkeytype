/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useContext, useState } from 'react';
import Popup from '@/components/PopUp';
import { Palette } from 'lucide-react';
import styles from './ThemePopup.module.css'
import { ThemeContext } from '@/context/ThemeContext';

const themes = [
  {title: 'retro',
    data: {
      '--bg-color': '#dad3c1',
      '--main-color': '#1d1b17',
      '--caret-color': '#1d1b17',
      '--sub-color': '#918b7d',
      '--sub-alt-color': '#c8c3b3',
      '--text-color': '#1d1b17',
      '--error-color': '#bf616a',
      '--error-extra-color': '#793e44',
    }
  },
  {
    title: 'ryujinscalse',
    data: {
      '--bg-color': '#081426',
      '--main-color': '#ec4c56',
      '--caret-color': '#ec4c56',
      '--sub-color': '#596172',
      '--sub-alt-color': '#040e1d',
      '--text-color': '#f6f0e9',
      '--error-color': '#9b333a',
      '--error-extra-color': '#7e2a33'
    }
  },
  {
    title: 'bushido',
    data: {
      '--bg-color': '#242933',
      '--main-color': '#f17754',
      '--caret-color': '#ef6d49',
      '--sub-color': '#ffbc90',
      '--sub-alt-color': '#040e1d',
      '--text-color': '#ffe4bc',
      '--error-color': '#ca4754',
      '--error-extra-color': '#7e2a33'
    }
  },

]

export default function ThemePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, updateTheme] = useContext(ThemeContext)
  return (
    <>
        <Palette
        onClick={() => {
          setIsOpen(true);
        }}
        />
      <Popup show={isOpen} darkBg={true} onClose={() => setIsOpen(false)}>
        <h2>Theme</h2>
          <div className={styles.list}>
            {themes.map((item, i) => {
              return (
                <li
                  key={i}
                  className={theme.title == item.title ? styles.active: ''}
                  onClick={() => {
                    updateTheme(item)
                    setIsOpen(false);
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </div>
      </Popup>
    </>
  );
}
