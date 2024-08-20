// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import axios from 'axios';
import config from '../../config';
import { jwtDecode } from 'jwt-decode';
import inMemoryJWTService from './inMemoryJWTService';
import { format } from 'date-fns';

export const ResultApi = axios.create({
  baseURL: `${config.API_URL}/results`,
  withCredentials: true,
});

export const saveResult = async (result) => {
  const userData = jwtDecode(inMemoryJWTService.getToken());

  if (userData) {
    const resultData = {
      ...result,
      userId: userData.id,
    };
    try {
      await ResultApi.post('/save', resultData);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getBestResults = async () => {
  const { id } = jwtDecode(inMemoryJWTService.getToken());
  if (id) {
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
export const getDashboard = async () => {
  const { id } = jwtDecode(inMemoryJWTService.getToken());
  if (id) {
    try {
      const { data } = await ResultApi.get(`/getDashboard?userId=${id}`);

      const joinDateIsoStr = format(new Date(data.joinDate), 'dd MMM yyyy');
      data.joinDate = joinDateIsoStr;

      return data;
    } catch (error) {
      console.error(error);
    }
  }
};
