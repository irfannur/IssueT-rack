import { withAuth } from 'next-auth/middleware';

export { withAuth } from 'next-auth/middleware';
export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
  });
export const config = {
    matcher: [
        '/issues/create',
        '/issues/edit/:id+'
    ]
}