// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AuthContext } from '@/context/AuthContext';
import { StatusContext } from '@/context/StatusContext';
import { StatusContextType } from '@/types/Status';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { CircleUserRound } from 'lucide-react';
import { getDashboard, getResults } from '@/services/resultServices';
import Circle from '@/components/Circle';
import { format } from 'date-fns';

export default function Dashboard() {
  const [data, setData] = useState({});
  const { isUserLogged } = useContext(AuthContext) as { isUserLogged: boolean };
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [itemsToShow, setitemsToShow] = useState(10);

  useEffect(() => {
    async function fetchData() {
      if (!isUserLogged) {
        navigate('/login');
      } else {
        const response = await getDashboard();
        setData(response);

        const resultsData = await getResults();
        setResults(resultsData);
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
        <Circle center={true} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.mainCard}>
            <div className={styles.leftSide}>
              <CircleUserRound strokeWidth={2} width={80} height={80} />
              <span>{data.username ? data.username : '-'}</span>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.statsItem}>
                <p>joined</p>
                <span>{data.joinDate}</span>
              </div>
              <div className={styles.statsItem}>
                <p>tests completed</p>
                <span>{data.completedTests}</span>
              </div>
              <div className={styles.statsItem}>
                <p>words typed</p>
                <span>{Math.floor(data.totalChars / 5)}</span>
              </div>
            </div>
          </div>
          <div className={styles.bestOnTime}>
          <p className={styles.label}>personal best</p>
            <div className={styles.bestItem}>
              <p>15 seconds</p>
              <span>{data.bestOn15 || '-'}</span>
            </div>
            <div className={styles.bestItem}>
              <p>30 seconds</p>
              <span>{data.bestOn30 || '-'}</span>
            </div>
            <div className={styles.bestItem}>
              <p>60 seconds</p>
              <span>{data.bestOn60 || '-'}</span>
            </div>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.statsItem}>
              <p>highest wpm</p>
              <span>{data.maxWpm || '-'}</span>
            </div>
            <div className={styles.statsItem}>
              <p>average wpm</p>
              <span>{Number(data.avgWpm).toFixed(2) || '-'}</span>
            </div>
            <div className={styles.statsItem}>
              <p>average wpm (last 10 tests)</p>
              <span>{Number(data.avgWpmLast10).toFixed(2) || '-'}</span>
            </div>
            <div className={styles.statsItem}>
              <p>highest accuracy</p>
              <span>{data.maxAccuracy || '-'}%</span>
            </div>
            <div className={styles.statsItem}>
              <p>average accuracy</p>
              <span>{Number(data.avgAccuracy).toFixed(2) || '-'}%</span>
            </div>
            <div className={styles.statsItem}>
              <p>average accuracy (last 10 tests)</p>
              <span>{Number(data.avgAccLast10).toFixed(2) || '-'}%</span>
            </div>
          </div>

          {results.length ? (
            <div className={styles.results}>
              <table className={styles.resultsTable}>
                <thead className={styles.tableHead}>
                  <tr>
                    <td>wpm</td>
                    <td>accuracy</td>
                    <td>correct</td>
                    <td>incorrect</td>
                    <td>time</td>
                    <td>numbers</td>
                    <td>capitals</td>
                    <td>punctuation</td>
                    <td>words</td>
                    <td>date</td>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(0, itemsToShow).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.tableValue}>{item.wpm}</td>
                        <td className={styles.tableValue}>{item.accuracy}%</td>
                        <td className={styles.tableValue}>{item.correct}</td>
                        <td className={styles.tableValue}>{item.inCorrect}</td>
                        <td className={styles.tableValue}>{item.time}</td>
                        <td className={styles.tableValue}>
                          {item.numbers ? 'on' : 'off'}
                        </td>
                        <td className={styles.tableValue}>
                          {item.capitals ? 'on' : 'off'}
                        </td>
                        <td className={styles.tableValue}>
                          {item.punctuation ? 'on' : 'off'}
                        </td>
                        <td className={styles.tableValue}>{item.words}</td>
                        <td className={styles.tableValue}>
                          {format(new Date(item.date), 'dd MMM yyyy')}
                          <br />
                          {format(new Date(item.date), 'HH:mm')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {results.length > 10 && (
                <button
                  className={styles.seeMoreButton}
                  onClick={() => setitemsToShow(itemsToShow + 10)}
                >
                  load more
                </button>
              )}
            </div>
          ) : (
            <p className={styles.noTestsSign}>You have no completed tests.</p>
          )}
        </div>
      )}
    </>
  );
}
