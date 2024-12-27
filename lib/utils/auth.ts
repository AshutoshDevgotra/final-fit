'use client';

import { auth } from '@/lib/firebase-client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const handleGoogleSignIn = async () => {
  if (!auth) throw new Error('Auth is not initialized');
  
  const provider = new GoogleAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup was blocked. Please enable popups for this site.');
    }
    throw error;
  }
};