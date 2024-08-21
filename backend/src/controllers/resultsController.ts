// @ts-nocheck

import ResultRepository from '../repositories/result';
import ResultsService from '../services/resultsService';

class restulsController {
  static async registerResult(req: Request, res: Response) {
    const data = {...req.body};
    data.date = new Date()
    try {
      await ResultRepository.registerResult(data);
      return res.status(201).json('Result saved');
    } catch (err) {
      console.error(err)
    }
  }
  static async getBestResultsByUser(req: Request, res: Response) {
    const { userId } = req.query
      try {
        const data = await ResultsService.getBestResultsByUser(userId)
        return res.status(200).json(data);
      } catch (error) {
        console.error(error)
      }
  }
  static async getResultsByUser(req: Request, res: Response) {
    const { userId } = req.query;
    try {
      const data = await ResultsService.getResultsByUser(userId);
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  static async getBestResultsByUser(req: Request, res: Response) {
    const { userId } = req.query;
    try {
      const data = await ResultsService.getBestResultsByUser(userId);
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  static async getBestResults(req: Request, res: Response) {
    const { time } = req.query;
    try {
      const data = await ResultRepository.getBestResults({ time });
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  static async getDashboard(req: Request, res: Response) {
    const { userId } = req.query;
    try {
      const data = await ResultsService.getDashboardByUser(userId);
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  
}
export default restulsController;
