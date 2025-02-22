'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaUserCircle } from 'react-icons/fa' // Import the user icon from react-icons

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const onLogout = async () => {
    try {
      const response = await axios.get(
        '/api/users/admin-logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      if (response.status === 200) {
        toast.success('Successfully logged out')
        router.push('/') // Redirect to the admin login page after logout
      } else {
        toast.error('Failed to log out')
      }
    } catch (error) {
      console.error('Error during logout', error)
      toast.error(error?.response?.data?.message || 'Logout failed')
    }
  }

  return (
    <nav className="flex items-center justify-between p-6 bg-primarydark text-[#EBD3F8] border-b-4 border-secondarydark shadow-lg">
      {/* Left Side - Logo */}
      <div className="text-3xl font-extrabold text-[#AD49E1] hover:text-[#EBD3F8] transition duration-300">
        Blog<span  className='text-[#AD49E1] hover:text-[#EBD3F8]'>Sphere</span>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <a
          href="#dashboard"
          className="text-xl text-[#EBD3F8] hover:text-[#AD49E1] transition duration-300 transform hover:scale-110"
        >
          Dashboard
        </a>
        <a
          href="#users"
          className="text-xl text-[#EBD3F8] hover:text-[#AD49E1] transition duration-300 transform hover:scale-110"
        >
          Users
        </a>
        <a
          href="#settings"
          className="text-xl text-[#EBD3F8] hover:text-[#AD49E1] transition duration-300 transform hover:scale-110"
        >
          Settings
        </a>
        <a
          href="#reports"
          className="text-xl text-[#EBD3F8] hover:text-[#AD49E1] transition duration-300 transform hover:scale-110"
        >
          Reports
        </a>
      </div>

      {/* Right Side - User Icon */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-14 h-14 rounded-full bg-[#AD49E1] flex items-center justify-center text-primarydark hover:bg-[#AD49E1] hover:text-[#EBD3F8] transition duration-300 transform hover:scale-110 shadow-lg"
        >
          {/* Profile Icon */}
          <FaUserCircle className="text-2xl" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#2E073F] text-[#EBD3F8] rounded-lg shadow-lg py-2 opacity-90 transition duration-200 transform scale-105 z-10">
            <a
              href="#user-profile"
              className="block px-4 py-2 text-lg hover:bg-[#7A1CAC] hover:text-[#EBD3F8] transition duration-300 transform hover:scale-105"
            >
              Admin Profile
            </a>
            <a
              onClick={() => {
                onLogout()
              }}
              className="block px-4 py-2 text-lg hover:bg-[#7A1CAC] hover:text-[#EBD3F8] transition duration-300 transform hover:scale-105"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AdminNavbar
