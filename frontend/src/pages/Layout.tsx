import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { StatusContext } from '@/context/StatusContext';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layhout.module.css';
import { StatusContextType } from '@/types/Status';

export default function Layout() {
  const { status } = useContext(StatusContext) as StatusContextType;

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      {status === 'waiting' && <Footer />}
    </div>
  );
}
