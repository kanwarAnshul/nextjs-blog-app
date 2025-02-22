import dbConnect from '@/database/dbConnect'
import Admin from '@/models/adminSchema'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req) {
  await dbConnect()

  const reqBody = await req.json()
  const { email, password } = reqBody

  const admin = await Admin.findOne({ email })
  if (!admin) {
    return NextResponse.json(
      {
        message: 'Admin does not exist. Please sign up as a new admin.',
        success: false,
      },
      { status: 400 },
    )
  }

  const isValidPassword = await bcrypt.compare(password, admin.password)
  if (!isValidPassword) {
    return NextResponse.json({ message: 'Invalid password', success: false }, { status: 401 })
  }

  // Return successful login response with admin email
  return NextResponse.json(
    {
      message: 'Successfully logged in as admin',
      success: true,
      data: { email: admin.email },
    },
    { status: 200 },
  )
}
