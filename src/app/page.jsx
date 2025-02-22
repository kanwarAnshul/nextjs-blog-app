'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Image
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 bg-no-repea bg-centert"
      />

      <div className="relative shadow-2xl text-center px-6 py-12 max-w-2xl  mx-auto bg-[#2E073F] bg-opacity-40 backdrop-blur-lg  rounded-lg">
        <h1 className="text-5xl text-[#EBD3F8] font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to BlogSphere
        </h1>
        <p className="text-xl text-white mb-8 animate__animated animate__fadeIn animate__delay-2s">
          A unique platform for sharing and exploring ideas through blogs.
        </p>
        <p className=" mb-8 text-2xl text-[#EBD3F8] animate__animated animate__fadeIn animate__delay-2s">
         Who you are ?
        </p>

        <div className="flex justify-center space-x-8">
          <div className="relative group">
            <button
              onClick={() => {
                router.push('/admin-login')
              }}
              className="px-6 py-3 bg-transparent border-2 border-white rounded-full hover:border-none text-lg font-semibold text-white focus:outline-none hover:bg-[#EBD3F8] hover:text-[#2E073F] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Admin
            </button>
          </div>

          <div className="relative group">
            <button
              onClick={() => {
                router.push('/user-login')
              }}
              className="px-6 py-3 bg-transparent border-2 border-white hover:border-none rounded-full text-lg font-semibold text-white focus:outline-none hover:bg-[#EBD3F8] hover:text-[#2E073F] transition duration-300 ease-in-out transform hover:scale-105"
            >
              User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
