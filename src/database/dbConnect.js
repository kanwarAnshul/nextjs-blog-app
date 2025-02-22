import mongoose from "mongoose"
import { NextResponse } from "next/server"

const  dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      NextResponse.json(
        {
          message: 'Successfully database connected',
          success: true,
        },
        { status: 201 },
      )
    })
    .catch((error) => {
      NextResponse.json(
        {
          message: `database connection error ${error.message}`,
          success: false,
        },
        { status: 400 },
      )
    })
}
export default dbConnect