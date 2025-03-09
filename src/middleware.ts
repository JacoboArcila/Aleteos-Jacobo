// In your Next.js middleware.js
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default async function middleware(request: NextRequest) {
    const cookiesStore = await cookies(); // Await the promise
    console.log("All cookies:", cookiesStore); // Log all cookies
    const token = cookiesStore.get('user')?.value; // Get the specific cookie
    console.log("token", token); // Log the token value
    return Response.json({ cookieValue: token }); // Return the token or handle as needed
        /*  if (token) {
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if user is admin
        if (decoded.role !== 'admin') {
        // Not an admin, redirect
        return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    } catch (error) {
        console.log(error);
        // Invalid token
        return NextResponse.redirect(new URL('/login', request.url));
    }
    } */
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
  
}