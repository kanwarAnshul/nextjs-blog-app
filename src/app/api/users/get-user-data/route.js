import User from '@/models/userSchema'
import { getDataFromToken } from '../../../../../helpers/getDataFromToken'
import { NextResponse } from 'next/server'
import dbConnect from '@/database/dbConnect'

export async function GET(req) {
  dbConnect()
  try {
    const userId = await getDataFromToken(req)

    if (!userId) {
      return NextResponse.json(
        {
          message: 'Invalid token or user ID not found in token',
          success: false,
        },
        { status: 400 },
      )
    }

    const user = await User.findOne({ _id: userId })

    if (!user) {
      return NextResponse.json(
        {
          message: 'User ID not found',
          success: false,
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        message: 'User found',
        success: true,
        user: user,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching user:', error.message)
    return NextResponse.json(
      {
        message: 'Something went wrong',
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
