import React from 'react';
import styles from './Popup.module.css';
import { X } from 'lucide-react';

interface PopupProps {
  darkBg: boolean;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({darkBg, show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={`${styles.popupOverlay} ${darkBg ? styles.darkBg : ''}`} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <X className={styles.closeButton} onClick={onClose} 
        />
        {children}
      </div>
    </div>
  );
};

export default Popup;
