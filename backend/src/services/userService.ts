//@ts-nocheck
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/user';
import TokenService from './tokenService';
import RefreshSessionsRepository from '../repositories/session';
import { Forbidden, Unauthorized } from '../utils/errors';

class userService {

  static async signUp({username, email, password, fingerprint}) {

    const hashedPassword = bcrypt.hashSync(password, 8)

    const joinDate = new Date()

    const [{insertedId}] = await UserRepository.createUser({
      username,
      email,
      hashedPassword,
      joinDate
    })

    const payload = {insertedId, username, email}

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionsRepository.createRefreshSession({
      id: insertedId,
      refreshToken,
      fingerprint
    })
    return {
      accessToken, 
      refreshToken, 
      accessTokenExpiration: 18e5
    }
  }

  static async signIn({ email, password, fingerprint }) {
    
    const userData = await UserRepository.getUserByEmail(email)

    if(!userData){
      throw new Unauthorized("Wrong email or password")
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password)
  
    if(!isPasswordValid){
      throw new Unauthorized("Wrong email or password")
    }

    const payload = {id: userData.id, email}

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionsRepository.createRefreshSession({
      id: userData.id,
      refreshToken,
      fingerprint
    })
    return {
      username: userData.username,
      accessToken, 
      refreshToken, 
      accessTokenExpiration: 18e5
    }
  }

  static async logOut(refreshToken) {
    await RefreshSessionsRepository.deleteRefreshSession(refreshToken)
  }

  static async refresh({fingerprint, currentRefreshToken}){
    if(!currentRefreshToken){
      throw new Unauthorized()
    }
    const refreshSession = await RefreshSessionsRepository.getRefreshSessions(
      currentRefreshToken
    )
    if (!refreshSession){
      throw new Unauthorized();
    }
    if(refreshSession.fingerPrint !== fingerprint.hash){
      throw new Forbidden()
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken)
    
    let payload;
    try{
      payload = await TokenService.verifyRefreshToken(currentRefreshToken)
    } catch (error) {
      throw new Forbidden(error)
    }

    const {
      id,
      username,
      email
    } = await UserRepository.getUserByEmail(payload.email)

    const actualPayload = {id, username, email}

    const accessToken = await TokenService.generateAccessToken(actualPayload)
    const refreshToken = await TokenService.generateRefreshToken(actualPayload)

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint
    })

    return {
      accessToken, 
      refreshToken,
      accessTokenExpiration: 18e5
    }
  }
}

export default userService;


