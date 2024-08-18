//@ts-nocheck
import { Router } from 'express';
import UserController from '../controllers/userController';
import WordsController from '../controllers/wordsController';
import restulsController from '../controllers/resultsController';
export const authRouter = Router()

authRouter.post('/sign-up', UserController.signUp);
authRouter.post('/sign-in', UserController.signIn);
authRouter.post('/logout', UserController.logOut);
authRouter.post('/refresh', UserController.refresh);
authRouter.get('/checkUsername', UserController.checkUsername)

export const wordsRouter = Router()
wordsRouter.get('/getWords', WordsController.getWords)
wordsRouter.get('/getAviableWords', WordsController.getAviableWordSets)

export const resultsRouter = Router()

resultsRouter.post('/save', restulsController.registerResult)
resultsRouter.get('/getBestResults', restulsController.getBestResultsByUser)
resultsRouter.get('/getLeaderboard', restulsController.getBestResults)
resultsRouter.get('/getDashboard', restulsController.getDashboard)


