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
  {
    title: 'aether',
    data: {
      '--bg-color': '#101820',
      '--main-color': '#eedaea',
      '--caret-color': '#eedaea',
      '--sub-color': '#cf6bdd',
      '--sub-alt-color': '#292136',
      '--text-color': '#eedaea',
      '--error-color': '#ff5253',
      '--error-extra-color': '#e3002b',
    },
  },
  {
    title: 'dolphin',
    data: {
      '--bg-color': '#003950',
      '--main-color': '#ffcefb',
      '--caret-color': '#00bcd4',
      '--sub-color': '#00e4ff',
      '--sub-alt-color': '#014961',
      '--text-color': '#82eaff',
      '--error-color': '#ffbde6',
      '--error-extra-color': '#ff8188',
    },
  },
  {
    title: 'cyberspace',
    data: {
      '--bg-color': '#181c18',
      '--main-color': '#00ce7c',
      '--caret-color': '#00ce7c',
      '--sub-color': '#9578d3',
      '--sub-alt-color': '#131613',
      '--text-color': '#c2fbe1',
      '--error-color': '#ff5f5f',
      '--error-extra-color': '#d22a2a',
    },
  },
  {
    title: 'dark magic',
    data: {
      '--bg-color': '#091f2c',
      '--main-color': '#f5b1cc',
      '--caret-color': '#a288d9',
      '--sub-color': '#93e8d3',
      '--sub-alt-color': '#071823',
      '--text-color': '#a288d9',
      '--error-color': '#e45c96',
      '--error-extra-color': '#e45c96',
    },
  },
  {
    title: 'earthsong',
    data: {
      '--bg-color': '#292521',
      '--main-color': '#509452',
      '--caret-color': '#1298ba',
      '--sub-color': '#f5ae2d',
      '--sub-alt-color': '#1d1b18',
      '--text-color': '#e6c7a8',
      '--error-color': '#7e2a33',
      '--error-extra-color': '#ff645a',
    },
  },
  {
    title: 'floret',
    data: {
      '--bg-color': '#00272c',
      '--main-color': '#ffdd6d',
      '--caret-color': '#c3bd40',
      '--sub-color': '#779097',
      '--sub-alt-color': '#173033',
      '--text-color': '#e5e5e5',
      '--error-color': '#8a4000',
      '--error-extra-color': '#00708d',
    },
  },
  {
    title: 'husget',
    data: {
      '--bg-color': '#000000',
      '--main-color': '#c58aff',
      '--caret-color': '#c58aff',
      '--sub-color': '#972fff',
      '--sub-alt-color': '#1e001e',
      '--text-color': '#ebd7ff',
      '--error-color': '#da3333',
      '--error-extra-color': '#791717',
    },
  },
  {
    title: 'incognito',
    data: {
      '--bg-color': '#0e0e0e',
      '--main-color': '#ff9900',
      '--caret-color': '#ff9900',
      '--sub-color': '#555555',
      '--sub-alt-color': '#151515',
      '--text-color': '#c6c6c6',
      '--error-color': '#e44545',
      '--error-extra-color': '#e44545',
    },
  },
  {
    title: 'vscode',
    data: {
      '--bg-color': '#1e1e1e',
      '--main-color': '#007acc',
      '--caret-color': '#569cd6',
      '--sub-color': '#4d4d4d',
      '--sub-alt-color': '#191919',
      '--text-color': '#d4d4d4',
      '--error-color': '#f44747',
      '--error-extra-color': '#f44747',
    },
  },
  {
    title: 'terra',
    data: {
      '--bg-color': '#0c100e',
      '--main-color': '#89c559',
      '--caret-color': '#89c559',
      '--sub-color': '#436029',
      '--sub-alt-color': '#0f1d18',
      '--text-color': '#f0edd1',
      '--error-color': '#d3ca78',
      '--error-extra-color': '#89844d',
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
                <div
                  style={{ backgroundColor: item.data['--bg-color'] }}
                  className={styles.colorPrevContainer}
                >
                  <div
                    style={{ backgroundColor: item.data['--main-color'] }}
                    className={styles.colorPrevItem}
                  ></div>
                  <div
                    style={{ backgroundColor: item.data['--sub-color'] }}
                    className={styles.colorPrevItem}
                  ></div>
                  <div
                    style={{ backgroundColor: item.data['--text-color'] }}
                    className={styles.colorPrevItem}
                  ></div>
                </div>
              </li>
            );
          })}
        </div>
      </Popup>
    </>
  );
}
