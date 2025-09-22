import React from 'react'
import Contact from '@/components/Contact'

const page = () => {
  return (
    <>
    <section className='min-h-screen w-full flex items-center justify-center p-5'>
    <div className='p-5 h-[80vh] w-full lg:w-2/3 border border-gray-700 rounded-4xl gap-5 flex flex-col lg:flex-row lg:p-10'>
    <header className='text-4xl text-center w-full h-full lg:w-1/2 lg:text-6xl flex items-center text-white lg:text-left'>
    Why waiting ?<br/>
    Let's go come on<br/>
    Fill the form !
    </header>
    <Contact/>
    </div>
    </section>
    </>
  )
}

export default page
