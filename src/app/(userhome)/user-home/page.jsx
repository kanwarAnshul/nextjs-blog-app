'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import BlogCreateForm from '@/components/BlogCreateForm'
import Loader from '@/components/Loader'
import axios from 'axios'
import toast from 'react-hot-toast'
import UserBlogs from '@/components/UsersBlogs'

const UserHomePage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [authorName, setAuthorName] = useState('')
  const [userId, setUserId] = useState()
  const [allUserBlog, setAllUserBlog] = useState([])

  useEffect(() => {
    fetchUserData()
    getAlluserBlogs()
  }, [showCreateForm])

  const getAlluserBlogs = async () => {
    setIsProcessing(true)
    const response = await axios.get('/api/users/get-alluser-blog', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    if (response.status) {
      setIsProcessing(false)
      console.log("all user data>>>>>>>✅✅✅",response.data.blogs);
      
      setAllUserBlog(response.data.blogs)
      toast.success('All user blog fetched successfully')
    } else {
      throw new Error('Error having during fetched UserBlogs')
    }
  }
  const fetchUserData = async () => {
    setIsProcessing(true)
    try {
      const response = await axios.get('/api/users/get-user-data', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      const user = response?.data?.user
      console.log('User data:', user)

      if (user) {
        setUserId(user._id)
        setAuthorName(user.username)
        toast.success('User data fetched successfully')
      } else {
        throw new Error('User data is missing.')
      }
    } catch (error) {
      toast.error(
        axios.isAxiosError(error) ? error.response?.data?.message || 'Failed to fetch user data' : 'An error occurred',
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCreatePostClick = () => setShowCreateForm((prev) => !prev)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-8 bg-gray-50">
        {/* Welcome Section */}
        <div className="bg-[#EBD3F8] p-8 rounded-lg mb-8">
          <h1 className="text-4xl font-bold text-[#2E073F] mb-4">Welcome to BlogSphere!</h1>
          <p className="text-lg text-[#2E073F] mb-4">
            Explore the latest posts, stay updated with trending articles, and dive into a world of creative content.
          </p>
          <Link
            href="/posts"
            className="inline-block bg-[#2E073F] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#EBD3F8] hover:text-black transition duration-300"
          >
            Explore Posts
          </Link>
        </div>

        {/* Create Blog Button */}
        <div className="mb-8 text-center">
          <button
            onClick={handleCreatePostClick}
            className="inline-block bg-[#2E073F] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#EBD3F8] hover:text-black transition duration-300"
          >
            Create a New Blog Post
          </button>
        </div>

        {/* Blog Create Form */}
        {showCreateForm && !isProcessing && (
          <BlogCreateForm authorName={authorName} setIsProcessing={setIsProcessing} userId={userId} />
        )}

        {/* Loader */}
        {isProcessing && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-[#2E073F] mb-6">Your Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allUserBlog.map((blog) => (
              <UserBlogs key={blog._id} blog={blog} />
            ))}
            {/* <UserBlogs/> */}
          </div>
        </div>

        {/* Explore Categories */}
        <div className="mt-12 mb-5">
          <h2 className="text-3xl font-semibold text-[#2E073F] mb-6">Explore Categories</h2>
          <div className="flex space-x-6">
            {['technology', 'lifestyle', 'health', 'entertainment'].map((category) => (
              <Link
                key={category}
                href={`/categories/${category}`}
                className="bg-[#EBD3F8] text-black font-semibold py-3 px-6 rounded-md hover:bg-[#2E073F] hover:text-white transition duration-300"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <h2 className="text-3xl font-semibold text-[#2E073F] mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'How to Manage a Blog',
              slug: 'how-to-manage-a-blog',
              desc: 'A step-by-step guide to efficiently manage a blog.',
            },
            {
              title: 'The Future of Blogging',
              slug: 'the-future-of-blogging',
              desc: 'Discover the latest trends in the blogging world.',
            },
            {
              title: 'Tips for Content Creators',
              slug: 'tips-for-content-creators',
              desc: 'Get insights into content creation strategies.',
            },
          ].map((post) => (
            <div key={post.slug} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#2E073F] mb-4">{post.title}</h3>
              <p className="text-[#2E073F] mb-4">{post.desc}</p>
              <Link href={`/posts/${post.slug}`} className="text-[#2E073F] font-semibold hover:text-[#EBD3F8]">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserHomePage
