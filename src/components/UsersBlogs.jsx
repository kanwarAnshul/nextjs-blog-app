'use client'
import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Image } from 'next/image'
const UserBlogs = ({ blog }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      {/* Blog Image */}
      {blog?.image && (
        <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Title and Date */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#2E073F]">
          {blog.title}
        </h3>
        <div className="text-sm text-gray-600">
          {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
        </div>
      </div>

      {/* Author and Categories */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">By {blog.author}</span>
        </div>
        {blog.categories.map((category, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-[#EBD3F8] text-[#2E073F] rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-[#2E073F] leading-relaxed">
          {blog.content}
        </p>
      </div>

      {/* Engagement Section */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {blog.likes.length} {blog.likes.length === 1 ? 'Like' : 'Likes'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {blog.dislikes.length} {blog.dislikes.length === 1 ? 'Dislike' : 'Dislikes'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {blog.shares} {blog.shares === 1 ? 'Share' : 'Shares'}
          </span>
        </div>
      </div>

      {/* Comments Section */}
      {blog.comments.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#2E073F] mb-4">
            {blog.comments.length} {blog.comments.length === 1 ? 'Comment' : 'Comments'}
          </h4>
          <div className="space-y-4">
            {blog.comments.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{comment.user.username}</span>
                  <span className="text-sm text-gray-600">
                    {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read More Button */}
      <div className="flex justify-end">
        <Link
          href={`/posts/${blog.slug}`}
          className="inline-block bg-[#2E073F] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#EBD3F8] hover:text-black transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default UserBlogs