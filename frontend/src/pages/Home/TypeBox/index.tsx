/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  MutableRefObject,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './TypeBox.module.css';
import CapsLockPopup from './CapsLockPopup';
import { ConfigContext } from '@/context/ConfigContext';
import { StatusContext } from '@/context/StatusContext';
import { Config, ConfigContextType } from '@/types/Config';
import { StatusContextType } from '@/types/Status';
import { Results, speedHistoryType } from '@/types/Results';
import contractionWords from '@/data/contractionWords';
import randomIndex from '@/utils/randomIndex';

type HistoryObject = { [key: string]: { [key: string]: boolean | null } };

interface WordRefs {
  error: boolean;
  ref: RefObject<HTMLSpanElement>;
}

const punctuationMarks = [',', '.', ':', '!'];
const punctuationMarksToAllow = punctuationMarks.concat(["'"]);

const speedHistory: speedHistoryType = {};

const calculateWPM = (t: number) => {
  const chars = document.querySelectorAll('.correct-char').length;
  const wpm = ((chars / t) * 60) / 5;

  return wpm;
};

const generateObject = (words: string[]) => {
  const result: HistoryObject = {};
  words.forEach((_: string, i: number) => {
    result[i] = {};
  });
  return result;
};

const generateWordsSet = (words: string[], config: Config) => {
  let res = [...words].sort(() => Math.random() - 0.5);
  if (config.capitals) {
    res = res.map((word) =>
      Math.random() < 0.35 // probability
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    );
  }
  if (config.numbers) {
    for (let i = 0; i < words.length / 4; i++) {
      const randomNumber = Math.floor(Math.random() * (i % 2 == 0 ? 99 : 9999));
      res.splice(randomIndex(words), 1, randomNumber.toString());
    }
  }
  if (config.punctuation) {
    for (let i = 0; i < words.length / 3; i++) {
      if (Math.random() < 0.2) {
        // add punctuation
        res[randomIndex(words)] +=
          punctuationMarks[randomIndex(punctuationMarks)];
      }
      if (Math.random() < 0.2) {
        // add contraction words
        res[randomIndex(words)] =
          contractionWords[randomIndex(contractionWords)];
      }
    }
    for (let i = 0; i < words.length / 4; i++) {
      if (Math.random() < 0.1) {
        // enclose some words in ''
        const wordIndex = randomIndex(words);
        res[wordIndex] = `'${words[wordIndex]}'`;
      }
    }
  }

  return res;
};

const countCharCorrectness = (history: HistoryObject) => {
  const nonEmptyObjs = Object.keys(history).filter(
    (key) => Object.keys(history[key]).length > 0
  );

  let correctCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const key of nonEmptyObjs) {
    const word = history[key];
    const keys = Object.keys(word);
    const correct = keys.filter((key) => word[key] === true).length;
    const error = keys.filter((key) => word[key] === false).length;
    const skipped = keys.filter((key) => word[key] === null).length;

    correctCount += correct;
    errorCount += error;
    skippedCount += skipped;
  }
  return { correctCount, errorCount, skippedCount };
};
let isAfkDetected = false;
let afkTimer: NodeJS.Timeout | null = null;

let accuracy = { correct: 0, incorrect: 0 };

type Props = {
  wordsData: string[];
  setResult: (results: Results) => void;
};

const TypeBox: React.FC<Props> = ({ wordsData, setResult }) => {
  { /* @ts-expect-error */ }
  const [config] = useContext(ConfigContext) as ConfigContextType;
  const [status, setStatus] = useContext(StatusContext) as StatusContextType;

  const [words, setWords] = useState(generateWordsSet(wordsData, config));
  const wordSpanRefs: WordRefs[] = useMemo(
    () =>
      Array(words.length)
        .fill(0)
        .map(() => ({ error: false, ref: React.createRef() })),
    [words]
  );

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [currInput, setCurrInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);

  const [capsLocked, setCapsLocked] = useState(false);
  const [history, setHistory] = useState<HistoryObject>(generateObject(words));

  const [timer, setTimer] = useState(0);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  const [wordsPosition, setWordsPosition] = useState(0);
  const [liveWPM, setLiveWPM] = useState(0);

  const start = () => {
    isAfkDetected = false;
    inputRef.current?.focus();
    accuracy = { correct: 0, incorrect: 0 };
    setStatus('started');

    const timeOut = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer + 1;
        const wpm = Math.round(calculateWPM(newTimer));
        setLiveWPM(wpm);

        if (newTimer > config.time && history) {
          setResult({
            wpm: Math.round(calculateWPM(prevTimer)),
            speedHistory: Object.values(speedHistory),
            charCorrectness: countCharCorrectness(history),
            accuracy,
            isAfk: Boolean(isAfkDetected),
            time: config.time,
          });
          clearInterval(timeOut);
          finish();
        }
        speedHistory[newTimer] = wpm;
        return newTimer;
      });
    }, 1000);
    intervalRef.current = timeOut;
  };

  const finish = () => {
    clearTimeout(afkTimer as NodeJS.Timeout);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTimer(0);
    setStatus('finished');
  };

  const reset = () => {
    clearTimeout(afkTimer as NodeJS.Timeout);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setTimer(0);
    setLiveWPM(0);
    setCurrChar('');
    setCurrInput('');
    setCurrCharIndex(-1);
    setCurrWordIndex(0);
    setInputWordsHistory({});
    setStatus('waiting');
    setHistory(generateObject(words));
    setWords(generateWordsSet(wordsData, config));
    setWordsPosition(0);
  };

  const [currChar, setCurrChar] = useState('');

  const [inputWordsHistory, setInputWordsHistory] = useState<{
    [key: string]: string;
  }>({});

  const handleInput = () => {
    if (status === 'waiting') {
      start();
    }
  };
  useEffect(() => {
    setWords(generateWordsSet(wordsData, config));
  }, [config]);

  useEffect(() => {
    inputRef.current?.focus();
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    checkCorrect();
  }, [currWordIndex]);

  const checkCorrect = () => {
    for (const wordIdx in history) {
      if (
        Object.values(history[wordIdx]).some(
          (value) => value === false || value === null
        ) ||
        inputWordsHistory[Number(wordIdx)]?.length >
          words[Number(wordIdx)].length
      ) {
        wordSpanRefs[Number(wordIdx)].error = true;
      } else {
        wordSpanRefs[Number(wordIdx)].error = false;
      }
    }
  };

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrInput(e.target.value);
    inputWordsHistory[currWordIndex] = e.target.value.trim();
    setInputWordsHistory(inputWordsHistory);
  };

  const handleFocus = (isFocus: boolean) => {
    setIsFocused(isFocus);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    const keyCode = e.keyCode;

    const isCtrlPressed = e.ctrlKey;

    setCapsLocked(e.getModifierState('CapsLock'));

    //tab
    if (keyCode === 9) {
      e.preventDefault();
      reset();
      return;
    }
    // backspace
    if (keyCode === 8 && history) {
      if (isCtrlPressed && history) {
        setCurrCharIndex(-1);
        history[currWordIndex] = {};
        return;
      }
      // jump to previous word if there is an error
      if (wordSpanRefs[currWordIndex - 1]) {
        if (currCharIndex < 0 && wordSpanRefs[currWordIndex - 1].error) {
          e.preventDefault();
          setCurrWordIndex(currWordIndex - 1);
          setCurrCharIndex(inputWordsHistory[currWordIndex - 1].length - 1);
          setCurrInput(inputWordsHistory[currWordIndex - 1]);
          return;
        }
      }

      if (currCharIndex < 0) {
        return;
      }

      setCurrCharIndex(currCharIndex - 1);
      setCurrChar('');

      delete history[currWordIndex][currCharIndex];
      return;
    }

    // spacebar
    if (keyCode === 32) {
      setCurrInput('');
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      return;
    }
    // disabling rest of keys
    if (
      !(keyCode >= 48 && keyCode <= 57) && // Numbers
      !(keyCode >= 65 && keyCode <= 90) && // Uppercase letters
      !(keyCode >= 97 && keyCode <= 122) && // Lowercase letters
      !punctuationMarksToAllow.includes(key)
    ) {
      e.preventDefault();
      return;
    }
    setCurrCharIndex(currCharIndex + 1);
    setCurrChar(key);
    if (afkTimer) {
      clearTimeout(afkTimer);
    }
    afkTimer = setTimeout(() => {
      isAfkDetected = true;
    }, 5000);
  };

  const getCharClassName = (
    wordIdx: number,
    charIdx: number,
    char: string,
    word: string
  ) => {
    if (!history) {
      return;
    }
    if (history[wordIdx][charIdx] === true) {
      if (
        wordIdx === currWordIndex &&
        charIdx === word.length - 1 &&
        charIdx === currCharIndex
      ) {
        return 'correct-char caret-right';
      }
      return 'correct-char';
    }
    if (history[wordIdx][charIdx] === false) {
      if (
        wordIdx === currWordIndex &&
        charIdx === word.length - 1 &&
        charIdx === currCharIndex
      ) {
        return 'error-char caret-right';
      }
      return 'error-char';
    }
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar) {
      if (char === currChar) {
        history[wordIdx][charIdx] = true;
        accuracy.correct++;
        return 'correct-char';
      } else {
        history[wordIdx][charIdx] = false;
        accuracy.incorrect++;
        return 'error-char';
      }
    } else {
      if (wordIdx < currWordIndex) {
        history[wordIdx][charIdx] = null;
      }
    }
    if (wordIdx === currWordIndex) {
      if (charIdx === currCharIndex + 1) {
        return 'current-char';
      }
    }
  };
  const getWordClassName = (wordIdx: number) => {
    const cls = ['word'];
    if (currWordIndex === wordIdx) {
      cls.push('active');
    }
    if (wordSpanRefs[wordIdx].error === true) {
      cls.push('error');
    }
    return cls.join(' ');
  };

  const getExtraCharsDisplay = (word: string, i: number) => {
    const input = inputWordsHistory[i] || currInput.trim();

    if (i > currWordIndex) {
      return null;
    }

    if (input.length <= word.length) {
      return null;
    } else {
      const extra = input.slice(word.length, input.length).split('');
      return extra.map((c: string, idx: number) => {
        const isLastChar = idx === extra.length - 1 && i === currWordIndex;
        return (
          <span
            key={idx}
            className={isLastChar ? 'error-char caret-right' : 'error-char'}
          >
            {c}
          </span>
        );
      });
    }
  };

  const scrollWords = () => {
    const activeWord = document.querySelector('.active.word') as HTMLElement;

    const wordsElement = document.querySelector('#words') as HTMLElement;
    if (!wordsElement || !activeWord) {
      return;
    }
    if (activeWord.offsetTop + wordsElement.offsetTop > 75) {
      setWordsPosition((prev) => prev - 45);
    }
  };
  useEffect(() => {
    scrollWords();
  }, [currWordIndex]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.typeBoxWrapper}>
          {status === 'started' && (
            <div className={styles.liveStats}>
              <span>{config.time - timer}</span>
              {config.liveWPM && <span>{liveWPM}</span>}
            </div>
          )}

          <div id="wordsWrapper" className={styles.wordsWrapper}>
            <div
              id="words"
              className={styles.words}
              style={{
                opacity: isFocused ? '1' : '.25',
                filter: isFocused ? '' : 'blur(4px)',
                top: `${wordsPosition}px`,
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {words.map((word: string, i: number) => (
                <span
                  key={i}
                  ref={wordSpanRefs[i].ref}
                  className={getWordClassName(i)}
                >
                  {word.split('').map((char: string, idx: number) => (
                    <span
                      key={'word' + idx}
                      className={getCharClassName(i, idx, char, word)}
                    >
                      {char}
                    </span>
                  ))}
                  {getExtraCharsDisplay(word, i)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.startSign} ${
            !isFocused ? styles.startSignVisible : ""
          }`}>Click here to start typing</div>
        
        <input
          key="hidden-input"
          ref={inputRef}
          type="text"
          className={styles.hiddenInput}
          // @ts-ignore
          onKeyDown={handleKeyDown}
          value={currInput}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          onInput={handleInput}
          onChange={(e) => updateInput(e)}
        />
        <CapsLockPopup open={capsLocked} />
      </div>
      {/* )} */}
    </>
  );
};

export default TypeBox;
