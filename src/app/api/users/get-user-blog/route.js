import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken"; // Adjust if needed

export async function GET(req) {
    try {
        const userId = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ message: "Invalid token or user ID missing" }, { status: 401 });
        }

        const existingUser = await User.findById(userId).populate("blogs");

        if (!existingUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User data fetched successfully", user: existingUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}
