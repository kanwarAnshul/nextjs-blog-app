'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        '/api/users/admin-login',
        { email: formData.email, password: formData.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (response.data.success) {
        toast.success('Successfully admin login')
        router.push('/admin-home')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBD3F8] to-[#2E073F]">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Left Container - Hidden on Small Screens */}
        <div className="hidden md:flex w-full md:w-1/2 p-8 bg-[#2E073F] text-[#EBD3F8] flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold mb-4 text-center">
            Welcome Back <br /> to <span className="text-[#EBD3F8]">BlogSphere</span>
          </h1>
          <Image
            src="/images/blog2.png"
            alt="Blog background"
            width={300}
            height={300}
            className="rounded-md"
            priority
          />
        </div>

        {/* Right Container - Full Width on Small Screens */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-[#EBD3F8] to-[#2E073F] text-white">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
            <p className="mb-6">Please enter your credentials to log in.</p>
          </div>

          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link href="/" className="flex items-center text-[#2E073F] hover:text-[#2E073F] font-semibold text-lg">
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EBD3F8]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EBD3F8]"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full p-3 bg-[#EBD3F8] text-black font-semibold rounded-md hover:bg-[#2E073F] hover:text-white transition duration-300 ease-in-out"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm text-[#EBD3F8]">
            <p>
              Don't have an account?{' '}
              <Link href="/admin-signup" className="text-[#EBD3F8] hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
