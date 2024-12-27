'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-context';
import { signOutUser } from '@/lib/services/auth';
import { LoginDialog } from './login-dialog';

export function AuthButton() {
  const { user } = useAuth();

  return user ? (
    <Button variant="outline" onClick={signOutUser}>
      Sign Out
    </Button>
  ) : (
    <LoginDialog />
  );
}