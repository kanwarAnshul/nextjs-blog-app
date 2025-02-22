'use client'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
const BlogCreateForm = ({ setIsProcessing, authorName, userId }) => {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState('')
  const [blogImage, setBlogImage] = useState(null) // Changed to null to store the image file
  const [blogContent, setBlogContent] = useState('')
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      await axios.post(
        '/api/users/create-user-blog',
        {
          userId: userId,
          title: title.trim(), // Ensure no leading/trailing spaces
          categories,
          author: authorName.trim(), // ✅ Trim extra spaces
          content: blogContent.trim(),
          image: typeof blogImage === 'string' ? blogImage.trim() : '', // ✅ Ensure string
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      toast.success('Successfully created blog post')
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create blog post'
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-semibold text-center mb-8 text-[#2E073F]">Create a New Blog Post</h2>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label className="text-lg font-medium text-[#2E073F]">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter blog title"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E073F] text-[#2E073F]"
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="text-lg font-medium text-[#2E073F]">Category</label>
          <select
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E073F] text-[#2E073F]"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {/* Content Field */}
        <div>
          <label className="text-lg font-medium text-[#2E073F]">Content</label>
          <textarea
            onChange={(e) => setBlogContent(e.target.value)}
            rows="6"
            placeholder="Write your blog content here..."
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E073F] text-[#2E073F]"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-lg font-medium text-[#2E073F]">Upload Image</label>
          <input
            onChange={(e) => setBlogImage(e.target.files?.[0] || '')} // Fixed image upload handling
            type="file"
            accept="image/*"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E073F] text-[#2E073F]"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-[#2E073F] text-white font-semibold rounded-lg hover:bg-[#EBD3F8] focus:outline-none focus:ring-2 focus:ring-[#EBD3F8]"
          >
            Publish Blog Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogCreateForm
