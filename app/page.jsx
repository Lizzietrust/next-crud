import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Control Your Information Flow
      </h1>
      <p className='desc text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, temporibus. Quidem ipsum dolorum harum nihil a vel consectetur excepturi quaerat?
      </p>

      <Feed />
    </section>
  )
}

export default Home
