import dbConnect from '@/database/dbConnect'
import Blog from '@/models/blogSchema'
import User from '@/models/userSchema'
import { NextResponse } from 'next/server'

export async function POST(req) {
  await dbConnect()

  try {
    const reqBody = await req.json()
    const { title, content, image, categories, author, userId } = reqBody

    if (!title || !content || !author || !userId) {
      return NextResponse.json({ message: 'Title, content, author, and userId are required' }, { status: 400 })
    }

    // Check if the user exists
    const currentUser = await User.findById(userId)
    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    console.log('The user found 😁😁', currentUser)

    // Create new blog post
    const newBlog = await Blog.create({
      title,
      content,
      image,
      categories,
      author,
      likes: [],
      dislikes: [],
      comments: [],
      shares: 0,
    })

    currentUser.blogs.push(newBlog._id)
    await currentUser.save()

    return NextResponse.json(
      {
        message: 'Blog post created successfully',
        blog: newBlog,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 })
  }
}
