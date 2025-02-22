import Blog from "@/models/blogSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allBlogs = await Blog.find().populate("author", "username"); 
    return NextResponse.json({ message: "Blogs fetched successfully", blogs: allBlogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}