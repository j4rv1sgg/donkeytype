export type speedHistoryType = Record<string, number>
export type Accuracy = {correct: number, incorrect: number}
export type Results = {
  wpm: number,
  speedHistory: number[],
  charCorrectness: speedHistoryType,
  accuracy: Accuracy,
  isAfk: boolean,
  time: number,
}
export type ResultsToSend = Pick<Results, 'wpm' | 'time'> & {
  corectness: Accuracy,
  accuracy: number,
  words: string,
  date: string, 
  punctuation: boolean,
  capitals: boolean,
  numbers: boolean
}