import { Results } from '@/types/Results';
import Chart from './Chart';
import styles from './Stats.module.css';
import { useContext, useEffect } from 'react';
import { Accuracy } from '@/types/Results';
import { saveResult } from '@/services/resultServices';
import { AuthContext } from '@/context/AuthContext';

const calcAccuracy = ({ correct, incorrect }: Accuracy) => {
  return Math.floor((100 / (correct + incorrect)) * correct) | 0;
};

interface Props {
  result: Results;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

let isSended: boolean = false;
const Stats: React.FC<Props> = ({ result, setStatus }) => {
  const { isUserLogged } = useContext(AuthContext);
  useEffect(() => {
    if (isUserLogged && !isSended) {
      saveResult(result);
      isSended = true;
    }
    const handleTabPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setStatus('waiting');
      }
    };

    window.addEventListener('keydown', handleTabPress);

    return () => {
      window.removeEventListener('keydown', handleTabPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStatus]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.results}>
        <div className={styles.mainstats}>
          <p>wpm</p>
          <span>{result.wpm}</span>
          <p>accuracy</p>
          <span>{calcAccuracy(result.accuracy)}%</span>
        </div>

        <div className={styles.chart}>
          <Chart chartData={result.speedHistory} />
        </div>

        <div className={styles.substats}>
          <div className={styles.substatsItem}>
            <p>characters</p>
            <span>
              {result.charCorrectness.correctCount}/
              {result.charCorrectness.errorCount}/
              {result.charCorrectness.skippedCount}
            </span>
          </div>
          {result.isAfk && (
            <div className={styles.substatsItem}>
              <p>other</p>
              <span>invalid test (afk detected)</span>
            </div>
          )}
        </div>
      </div>

      <p>Press TAB to restart</p>
    </div>
  );
};

export default Stats;
