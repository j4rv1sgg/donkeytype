//@ts-nocheck
import WordsRepository from '../repositories/words';

class WordsController {
  static async getWords(req: Request, res: Response) {
    const { name } = req.query;
    try {
      const wordsData = await WordsRepository.getWordsByName(name);

      return res.status(200).json(wordsData);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
  static async getAviableWordSets(req: Request, res: Response) {
    try {
      const wordsData = await WordsRepository.getAviableWords();
      const result = wordsData?.map(item => item.name)
      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}
export default WordsController;
