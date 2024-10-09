import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(request) {

    if (request.nextUrl.pathname.startsWith('/write')) {
        const session = await getToken({ req: request })
        console.log('세션', session)
        if (session == null) {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith('/list')) {
        console.log(new Date().toLocaleString())
        console.log(request.headers.get('sec-ch-ua-platform'))
        return NextResponse.next()
    }
    if (request.nextUrl.pathname.startsWith('/register')) {

        if (request.cookies.has('visited') == false) {
            const response = NextResponse.next()
            response.cookies.set({
                name: 'visited',
                value: 'true',
                maxAge: 3600,
            })
            return response
        }
        return NextResponse.next()

    }
} 