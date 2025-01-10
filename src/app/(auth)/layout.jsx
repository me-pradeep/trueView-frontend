import React from 'react'

function layout({children}) {
  return (
    <main className='flex flex-col items-center justify-center gap-5 h-screen'>
      {children}
    </main>
  )
}

export default layout