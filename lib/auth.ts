import { cookies } from 'next/headers';

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    return !!session;
  } catch {
    return false;
  }
}



