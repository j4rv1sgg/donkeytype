//@ts-nocheck

import ResultRepository from '../repositories/result';
class ResultsService {
  static async getBestResultsByUser(userId) {
    const bestOn15 = await ResultRepository.getBestResultByTime({
      userId,
      time: 15,
    });
    const bestOn30 = await ResultRepository.getBestResultByTime({
      userId,
      time: 30,
    });
    const bestOn60 = await ResultRepository.getBestResultByTime({
      userId,
      time: 60,
    });
    const res = {
      bestOn15: bestOn15.wpm,
      bestOn30: bestOn30.wpm,
      bestOn60: bestOn60.wpm,
    };
    return res;
  }
  static async getDashboardByUser(userId) {
    const res = await ResultRepository.getDashboard(userId);
    const bestOnTime = await this.getBestResultsByUser(userId);
    return { ...res[0], ...bestOnTime };
  }

  static async getResultsByUser(userId) {
    const res = await ResultRepository.getResults({ userId });
    return res;
  }
}

export default ResultsService;
