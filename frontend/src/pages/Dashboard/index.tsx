// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { AuthContext } from '@/context/AuthContext';
import { StatusContext } from '@/context/StatusContext';
import { StatusContextType } from '@/types/Status';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { CircleUserRound } from 'lucide-react';
import { getBestResults, getDashboard } from '@/services/resultServices';
import Circle from '@/components/Circle';

export default function Dashboard() {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({})
  const { isUserLogged } = useContext(AuthContext) as { isUserLogged: boolean };
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!isUserLogged) {
        navigate('/login');
      } else {
        const res = await getBestResults();
        setData(res.data);

        const response = await getDashboard()
        setNewData(response)
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [, setStatus] = useContext(StatusContext) as StatusContextType;
  setStatus('waiting');
  return (
    <>
      {loading ? (
        <Circle center={false} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.mainCard}>
            <div className={styles.leftSide}>
              <CircleUserRound strokeWidth={2} width={80} height={80} />
              <span>{newData.username || '-'}</span>
              <p>Joined {newData.joinDate}</p>
              
            </div>
            <div className={styles.rightSide}>
              <div className={styles.listItem}>
                <span>15 sec</span>
                <span>{data[15] || '-'}</span>
              </div>
              <div className={styles.listItem}>
                <span>30 sec</span>
                <span>{data[30] || '-'}</span>
              </div>
              <div className={styles.listItem}>
                <span>60 sec</span>
                <span>{data[60] || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
