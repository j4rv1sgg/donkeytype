import axios from "axios";
import config from "../../config";

export const WordsApi = axios.create({
  baseURL: `${config.API_URL}/words`,
  withCredentials: true,
});

export const getWords = async (name: string) => {
  try {
    const res = await WordsApi.get(`/getWords?name=${name}`);
    return res
  } catch (error) {
      console.error(error);
  }
}
export const getAviableWordSets = async () => {
  try {
    const res = await WordsApi.get(`/getAviableWords`);
    return res
  } catch (error) {
      console.error('Error fetching words:', error);
  }
}