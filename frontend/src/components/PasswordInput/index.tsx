import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { EyeIcon } from 'lucide-react';
import { EyeOffIcon } from 'lucide-react';
import styles from './index.module.css';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
      setShow((prev) => !prev);
    };
    return (
      <div className={styles.container}>
        <input
          {...props}
          ref={ref}
          type={show ? 'text' : 'password'}
          className={styles.input}
        />
        {show ? (
          <EyeIcon size={24} onClick={toggleShow} className={styles.icon} />
        ) : (
          <EyeOffIcon size={24} onClick={toggleShow} className={styles.icon} />
        )}
      </div>
    );
  }
);
export default PasswordInput;
