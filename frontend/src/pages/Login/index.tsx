import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './Login.module.css';
import { StatusContext } from '@/context/StatusContext';
import { StatusContextType } from '@/types/Status';
import { useContext } from 'react';

export default function Login() {
  const [, setStatus] = useContext(StatusContext) as StatusContextType;
  setStatus('waiting');
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <p className={styles.formTitle}>Login</p>
          <LoginForm />
        </div>
        <div>
          <p className={styles.formTitle}>Register</p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
