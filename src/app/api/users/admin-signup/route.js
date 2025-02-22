import { NextResponse } from 'next/server'
import Admin from '@/models/adminSchema'
import bcrypt from 'bcrypt'
import dbConnect from '@/database/dbConnect'

// Connect to the database
dbConnect()

export async function POST(req) {
  const reqBody = await req.json()
  const { adminName, email, password } = reqBody

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return NextResponse.json(
        {
          message: 'Admin already exists with this email',
          success: false,
        },
        { status: 409 }, // 409 Conflict since the admin already exists
      )
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new admin
    const newAdmin = await Admin.create({
      adminName,
      email,
      password: hashedPassword,
    })

    // Return success response
    return NextResponse.json(
      {
        message: 'Admin created successfully',
        success: true,
        admin: newAdmin,
      },
      { status: 201 }, // 201 Created
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'An error occurred while creating the admin',
        success: false,
      },
      { status: 500 },
    )
  }
}
