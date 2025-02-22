import User from '@/models/userSchema'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConnect from '@/database/dbConnect'

dbConnect()

export async function POST(req) {
  try {
    const reqBody = await req.json()
    const { email, password } = reqBody

    // Find the user
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return NextResponse.json({ message: 'No existing user with this email', success: false }, { status: 404 })
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, existingUser.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid password', success: false }, { status: 401 })
    }

    // Generate token
    const token = jwt.sign({ userId: existingUser._id, email: existingUser.email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    // Set token in cookie
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    })
    
    response.cookies.set('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 }) // 7 days expiry
    response.cookies.set('role', "role", { httpOnly: true, maxAge: 7 * 24 * 60 * 60 }) // 7 days expiry

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'An error occurred', success: false, error: error.message }, { status: 500 })
  }
}
