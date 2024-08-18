//@ts-nocheck

import ResultRepository from "../repositories/result";

function getMaxWPM(data, time) {
  const filtered = data.filter(result => result.time === time);

  if (filtered.length === 0) {
      return null;
  }

  const maxWPM = Math.max(...filtered.map(result => result.wpm));

  return maxWPM;
}

class ResultsService {
  // static async getResultsByUser(userId) {
  //   const allResults = await ResultRepository.getResultsById(userId)
  // }
  static async getDashboardByUser(userId) {
    const res = await ResultRepository.getDashboard(userId)
    return res[0]
  }
  
  static async getBestResultsByUser(userId) {
    const allResults = await ResultRepository.getResultsById(userId)
    const res = {
      15: getMaxWPM(allResults, 15),
      30: getMaxWPM(allResults, 30),
      60: getMaxWPM(allResults, 60)
    }
    return res
  }

  
}

export default ResultsService;
