'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';


export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    if (isSignedIn && isLoaded && pathname === '/') {
      router.replace('/home')
    }
  }, [isSignedIn, isLoaded, pathname])

  if (!isLoaded) return null; 

    if (!isSignedIn) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
          <p className="text-lg text-gray-600 mb-8">Please sign in to continue.</p>
          {/* You can include a Clerk SignInButton here */}
        </div>
      );
    }


}
