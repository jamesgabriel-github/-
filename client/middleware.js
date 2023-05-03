// import { NextResponse } from "next/server";

// export function middleware(req){
//     console.log(req.nextUrl.pathname);
//     return NextResponse.next()
// }

import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req){
        console.log("Middleware");
        console.log(req.nextauth);
        if(req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role!=="admin"){
            console.log("Must be admin role");
            console.log(req.url);
            return NextResponse.rewrite(new URL("/login?message=Page is availabe for Admin only!", req.url));
            // return new NextResponse("You are not authorized!");
        }
        if(req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user"){
            return NextResponse.rewrite(new URL("/login?message=You are Not Authorized!", req.url));
            // return new NextResponse("You are not authorized!");
        }
    },
    {
        callbacks:{
            authorized:({token})=> !!token,
            // authorized: (params) => {
            //     let {token} = params;
            //     return !!token;
            // }
        }
    }
)

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
}