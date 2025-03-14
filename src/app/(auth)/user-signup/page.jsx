'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const UserSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
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
        '/api/users/user-signup',
        {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      if (response.data.success) {
        toast.success('Successfully signed up')
        router.push('/user-login')
        setFormData({ name: '', email: '', password: '' })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBD3F8] to-[#2E073F]">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Container - Hidden on Small Screens */}
        <div className="hidden md:flex w-full md:w-1/2 p-8 bg-[#2E073F] text-[#EBD3F8] flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold mb-4 text-center">
            Welcome to <br /> <span className="text-[#EBD3F8]">BlogSphere</span>
          </h1>
          <div className="flex items-center justify-center">
            <img
              src="/images/blog4.png"
              alt="Blog background"
              width={300}
              height={300}
              className="rounded-md"
              priority
            />
          </div>
        </div>

        {/* Right Container - Full Width on Small Screens */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-[#EBD3F8] to-[#2E073F] text-white">
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link href="/user-login" className="text-[#2E073F] text-xl font-semibold hover:text-[#2E073F]">
              &#8592; Back
            </Link>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-4">User Sign Up</h2>
            <p className="mb-6">Please enter your details to create an account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EBD3F8]"
                required
              />
            </div>

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
                Sign Up
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-white">
              Already have an account?{' '}
              <Link href="/user-login" className="text-[#EBD3F8] font-semibold hover:text-[#2E073F]">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignUpPage
