import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || ''
    
    if (!token) throw new Error('No token found')

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined')
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken.userId 
  } catch (error) {
    throw new Error(error.message || 'Invalid token')
  }
}
