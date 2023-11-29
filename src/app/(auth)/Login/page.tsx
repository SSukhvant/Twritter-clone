"use client"
import React from 'react'
import github from '@/assets/github-mark-white.png'
import google from '@/assets/google-logo.png'
import twitterbg from '@/assets/twitter-bg.jpg'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
// import { ArrowRight } from 'lucide-react'

export default function Login() {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full rounded-md object-cover object-top"
              src={twitterbg}
              alt=""
              fill
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
            <h1 className="text-6xl font-bold text-white">
              Happening now
              </h1>
              <h3 className="text-3xl mt-2 font-bold text-white">
              Join today.
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mt-3 space-y-3">
              <button
                type="button"
                onClick={() => signIn("google", {callbackUrl: "/", redirect: true})}
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-[#010409] px-3.5 py-2.5 font-semibold text-[#d9d9d9] transition-all duration-200 hover:bg-[#0D1117] hover:text-[#d0d0d0] focus:bg-[#0D1117] focus:text-[#d0d0d0]"
              >
                <span className="mr-2 inline-block">
                <Image src={google} alt='google' height={24} width={24} />
                </span>
                Sign in with Google
              </button>
              <button
                type="button"
                onClick={() => signIn("github", {callbackUrl: "/", redirect: true})}
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-[#010409] px-3.5 py-2.5 font-semibold text-[#d9d9d9] transition-all duration-200 hover:bg-[#0D1117] hover:text-[#d0d0d0] focus:bg-[#0D1117] focus:text-[#d0d0d0]"
              >
                <span className="mr-2 inline-block">
                <Image src={github} alt='github' height={24} width={24}/>
                </span>
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
