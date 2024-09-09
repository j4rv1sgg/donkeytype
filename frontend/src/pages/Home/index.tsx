import { useContext, useEffect, useState } from 'react';
import TypeBox from './TypeBox';
import styles from './Home.module.css';
import Stats from './Stats';
import TypeConfig from './TypeBox/TypeConfig';
import { StatusContext } from '@/context/StatusContext';
import { Results } from '@/types/Results';
import { StatusContextType } from '@/types/Status';
import Circle from '@/components/Circle';
import { getWords } from '@/services/wordsServices';
import { ConfigContext } from '@/context/ConfigContext';
import { ConfigContextType } from '@/types/Config';

let wordsData: string[] = [];

export default function Home() {
  const [result, setResult] = useState<Results>({
    wpm: 0,
    speedHistory: [],
    charCorrectness: {},
    accuracy: { correct: 0, incorrect: 0 },
    isAfk: false,
    time: 0,
  });
  const configContext = useContext(ConfigContext) as ConfigContextType;
  const config = configContext.config 
  const {status, setStatus} = useContext(StatusContext) as StatusContextType;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWords(config.words).then((res) => {
      wordsData = res?.data.words;
      setLoading(false);
    });
  }, [config.words]);

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
