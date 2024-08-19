import styles from './Header.module.css';
import logo from '@/assets/logo.svg';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusContext } from '@/context/StatusContext';
import { StatusContextType } from '@/types/Status';
import { CircleUserRound } from 'lucide-react';
import { LogOut } from 'lucide-react';
import Leaderboard from './Leaderboard';

export default function Header() {
  const navigate = useNavigate();
  const [, setStatus] = useContext(StatusContext) as StatusContextType;
  const { isUserLogged, handleLogOut } = useContext(AuthContext);
  const username = localStorage.getItem('username');
  const handleLogoutClick = () => {
    handleLogOut();
    navigate('/login');
  };
  const handleLogoClick = () => {
    setStatus('waiting');
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={handleLogoClick} className={styles.logoWrapper}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.title}>DonkeyType</span>
        <Leaderboard />
      </div>
      <div className={styles.headerButtons}>
        {isUserLogged ? (
          <>
            <div
              className={styles.profile}
              onClick={() => navigate('/dashboard')}
            >
              <span className={styles.username}>{username}</span>

              <CircleUserRound
                className={styles.headerButton}
                strokeWidth={3}
                width={26}
                height={26}
                color="var(--sub-color)"
              />
            </div>
            <LogOut
              className={styles.headerButton}
              onClick={handleLogoutClick}
              color="var(--sub-color)"
              width={26}
              height={26}
              strokeWidth={3.5}
            />
          </>
        ) : (
          <CircleUserRound
            className={styles.headerButton}
            onClick={() => navigate('/login')}
            strokeWidth={3}
            width={26}
            height={26}
            color="var(--sub-color)"
          />
        )}
      </div>
    </div>
  );
}
