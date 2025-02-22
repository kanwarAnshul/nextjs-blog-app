import { Toaster } from 'react-hot-toast'
import './../../globals.css'
import Navbar from '@/components/UserNavbar'

export const metadata = {
  title: 'Admin Home',
  description: 'Admin Dashboard Layout',
}

export default function UserHomeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Navbar/>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
