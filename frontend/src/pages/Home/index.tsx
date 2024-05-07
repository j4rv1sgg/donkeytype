import { useContext, useEffect, useState } from 'react';
import TypeBox from './TypeBox';
import styles from './Home.module.css';
import Stats from './Stats';
import TypeConfig from './TypeBox/TypeConfig';
import { StatusContext } from '@/context/StatusContext';
import { Results } from '@/types/Results';
import { StatusContextType } from '@/types/Status';
import Circle from '@/components/Circle';
import axios from 'axios';
import appConfig from '../../../config';

let wordsData: string[] = [];

export default function Home() {
  const [result, setResult] = useState<Results>({
    wpm: 0,
    speedHistory: [],
    charCorrectness: {},
    accuracy: { correct: 0, incorrect: 0 },
    isAfk: false,
  });
  const [status, setStatus] = useContext(StatusContext) as StatusContextType;
  const [loading, setLoading] = useState(true); // Статус загрузки данных

  useEffect(() => {
    axios
      .get(`${appConfig.API_URL}/words/getWords?name=english`)
      .then((res) => {
          wordsData = res.data.words;
          setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching words:', error);
        setLoading(false);
      });
  }, []);
  return (
    <div className={styles.wrapper}>
      {status == 'finished' ? (
        <Stats result={result} setStatus={setStatus} />
      ) : (
        <>
          <TypeConfig isVisible={status === 'waiting'} />
          {!loading && wordsData.length ? (
            <TypeBox setResult={setResult} wordsData={wordsData} />
          ) : (
            <Circle center={false} />
          )}
        </>
      )}
    </div>
  );
}
