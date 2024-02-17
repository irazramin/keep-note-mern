import React from 'react'

const Dropdown = ({ children, className }) => {
  return (
    <div className={`absolute shadow rounded-md p-2 bg-white z-50 top-full ${className}`}>
      {children}
    </div>
  )
}

export default Dropdown
