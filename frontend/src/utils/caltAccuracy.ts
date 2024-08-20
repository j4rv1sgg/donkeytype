import { Accuracy } from "@/types/Results";

export const calcAccuracy = ({ correct, incorrect }: Accuracy) => {
  return Math.floor((100 / (correct + incorrect)) * correct) | 0;
};