import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4"
        style={{
          borderTopColor: '#EBD3F8', // Light theme color
          borderRightColor: '#2E073F', // Dark theme color
          borderBottomColor: '#2E073F', // Dark theme color
          borderLeftColor: '#2E073F', // Dark theme color
        }}
      ></div>
    </div>
  )
}

export default Loader
