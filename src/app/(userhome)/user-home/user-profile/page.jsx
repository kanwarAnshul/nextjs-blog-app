'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const UserProfilePage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/users/get-user-data', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        console.log('the user data>>', data.users)
        setUsername(data.user.username)
        setEmail(data.user.email)
      } catch (error) {
        console.log('error:', error.message)
        toast.error(error.message)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className="bg-[#2E073F] min-h-screen text-[#EBD3F8] flex justify-center items-center p-5">
      <div className="bg-[#7A1CAC] p-10 rounded-lg text-center max-w-md w-full shadow-lg">
        <img
          src="https://via.placeholder.com/120"
          alt="User Avatar"
          className="rounded-full border-4 border-[#EBD3F8] mb-5 mx-auto"
        />
        <h2 className="text-2xl font-semibold mb-2">{username ? username : 'John Doe'}</h2>
        <p className="text-[#AD49E1] text-lg mb-4">{email? email : 'Passionate Blogger & Writer'}</p>
        <p className="text-sm leading-relaxed">
          Welcome to my profile! I love sharing my thoughts on technology, lifestyle, and creativity. Stay tuned for my
          latest articles.
        </p>
        <div className="mt-5">
          <a
            href="#"
            className="bg-[#AD49E1] text-[#EBD3F8] px-5 py-2 rounded-md text-sm font-bold hover:bg-[#9C3BCC] transition"
          >
            View Blog
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
