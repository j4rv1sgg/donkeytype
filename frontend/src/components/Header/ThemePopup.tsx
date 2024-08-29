/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useContext, useState } from 'react';
import Popup from '@/components/PopUp';
import { Palette } from 'lucide-react';
import styles from './ThemePopup.module.css';
import { ThemeContext } from '@/context/ThemeContext';

const themes = [
  {
    title: 'retro',
    data: {
      '--bg-color': '#dad3c1',
      '--main-color': '#1d1b17',
      '--caret-color': '#1d1b17',
      '--sub-color': '#918b7d',
      '--sub-alt-color': '#c8c3b3',
      '--text-color': '#1d1b17',
      '--error-color': '#bf616a',
      '--error-extra-color': '#793e44',
    },
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
      '--error-extra-color': '#7e2a33',
    },
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
      '--error-extra-color': '#7e2a33',
    },
  },
  {
    title: 'arch',
    data: {
      '--bg-color': '#0c0d11',
      '--main-color': '#7ebab5',
      '--caret-color': '#7ebab5',
      '--sub-color': '#454864',
      '--sub-alt-color': '#171a25',
      '--text-color': '#f6f5f5',
      '--error-color': '#ff4754',
      '--error-extra-color': '#b02a33',
    },
  },
  {
    title: 'art hero',
    data: {
      '--bg-color': '#00002e',
      '--main-color': '#ffadad',
      '--caret-color': '#ffffff',
      '--sub-color': '#ff3d8b',
      '--sub-alt-color': '#060548',
      '--text-color': '#f1deef',
      '--error-color': '#8fecff',
      '--error-extra-color': '#558cab',
    },
  },
];

export default function ThemePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, updateTheme] = useContext(ThemeContext);
  return (
    <>
      <Palette
        className={styles.icon}
        size={23}
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
                className={theme.title == item.title ? styles.active : ''}
                onClick={() => {
                  updateTheme(item);
                  setIsOpen(false);
                }}
              >
                <span>{item.title}</span>
                <div style={{'backgroundColor': item.data['--bg-color']}} className={styles.colorPrevContainer}>
                  <div style={{'backgroundColor': item.data['--main-color']}} className={styles.colorPrevItem}></div>
                  <div style={{'backgroundColor': item.data['--sub-color']}} className={styles.colorPrevItem}></div>
                  <div style={{'backgroundColor': item.data['--text-color']}} className={styles.colorPrevItem}></div>
                </div>
              </li>
            );
          })}
        </div>
      </Popup>
    </>
  );
}
