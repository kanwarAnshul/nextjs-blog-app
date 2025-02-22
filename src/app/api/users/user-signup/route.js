import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// import { dbConnect } from '@/database/dbConnect';
import dbConnect from '@/database/dbConnect';
import User from '@/models/userSchema';

export async function POST(req) {
  await dbConnect(); 
  const reqBody = await req.json(); 
  const { username, email, password } = reqBody;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: 'User already exists, please login',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create  save the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    // Respond with success
    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'An error occurred while creating the user',
      success: false,
    });
  }
}
