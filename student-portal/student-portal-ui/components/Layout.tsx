import React from 'react'

import Header from './Header'

const Layout = ({ children }: any): JSX.Element => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#e0d1d1',
        minHeight: '100vh',
        overflowX: 'hidden',
        overflowY: 'hidden'
      }}
    >
      <Header />
      {children}
    </div>
  )
}

export default Layout
