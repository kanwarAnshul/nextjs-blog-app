import { Toaster } from 'react-hot-toast'
import './../../globals.css'
import AdminNavbar from '@/components/AdminNavbar'

export const metadata = {
  title: 'Admin Home',
  description: 'Admin Dashboard Layout',
}

export default function AdminHomeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <AdminNavbar/>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
