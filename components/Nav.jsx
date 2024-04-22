'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect(() => {
  //   const setProviders = async () => {
  //     const response = await getProviders();

  //     setProviders(response)
  //   }

  //   setProviders();
  // }, [])

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/'>
        LOGO
      </Link>

      <div className='sm:flex hidden'>
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-post' className='black_btn'>
                Create Post
              </Link>

              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' />
              </Link>

            </div>
          ) : (
            <>
              {
                providers &&
                Object.values(providers).map((provider) => (
                  <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>

      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className="flex">
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={() => setToggleDropdown((prev) => !prev)}  />

              {
                toggleDropdown && (
                  <div className="dropdown">
                    <Link className="dropdown_link" href='/profile' onClick={() => setToggleDropdown(false)}>
                      My Profile
                    </Link>

                    <Link className="dropdown_link" href='/create-post' onClick={() => setToggleDropdown(false)}>
                      Create Post
                    </Link>

                    <button type="button" onClick={() => {
                      setToggleDropdown(false)
                      signOut()
                    }} className='mt-5 w-full black_btn'>
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : 
          (
            <>
              {
                providers &&
                Object.values(providers).map((provider) => (
                  <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
