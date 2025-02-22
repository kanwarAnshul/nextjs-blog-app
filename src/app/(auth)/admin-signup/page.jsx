'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AdminSignUpPage = () => {
  const [formData, setFormData] = useState({
    adminName: '',
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
        'api/users/admin-signup',
        { adminName: formData.adminName, email: formData.email, password: formData.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (response.data.success) {
        toast.success('Successfully admin register')
        router.push('admin-login')
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
            Welcome to <br /> <span className="text-[#EBD3F8]">BlogSphere</span>
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
            <h2 className="text-3xl font-bold mb-4">Admin Sign Up</h2>
            <p className="mb-6">Create your account to start managing BlogSphere.</p>
          </div>

          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link
              href="/admin-login"
              className="flex items-center text-[#2E073F] hover:text-[#2E073F] font-semibold text-lg"
            >
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
              <label htmlFor="confirmPassword" className="block text-sm font-semibold">
                Admin name
              </label>
              <input
                type="text"
                id="adminName"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EBD3F8]"
                required
              />
            </div>
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
                Sign Up
              </button>
            </div>
          </form>

          {/* Log In Link */}
          <div className="mt-4 text-center text-sm text-[#EBD3F8]">
            <p>
              Already have an account?{' '}
              <Link href="/admin-login" className="text-[#EBD3F8] hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSignUpPage
