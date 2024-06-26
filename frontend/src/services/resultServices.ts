// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import axios from 'axios';
import config from '../../config';
import { Results } from '@/types/Results';
import { jwtDecode } from 'jwt-decode';
import inMemoryJWTService from './inMemoryJWTService';

export const ResultApi = axios.create({
  baseURL: `${config.API_URL}/results`,
  withCredentials: true,
});

export const saveResult = async (result: Results) => {
  const userData = jwtDecode(inMemoryJWTService.getToken());
  if(userData) {

    const resultData = {
      ...result,
      userId: userData.id,
    };
    
    delete resultData.speedHistory;
    delete resultData.accuracy;
    delete resultData.isAfk;
    resultData.userId = userData.id;
    try {
      await ResultApi.post('/save', resultData);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getBestResults = async () => {
  const {id} = jwtDecode(inMemoryJWTService.getToken());
  if(id){
    try {
      const res = await ResultApi.get(`/getBestResults?userId=${id}`);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
};
export const getLeaderboard = async (time) => {
    try {
      const res = await ResultApi.get(`/getLeaderboard?time=${time}`);
      return res;
    } catch (error) {
      console.error(error);
    }
};
