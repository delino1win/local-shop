import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // console.log("Req next url", request.nextUrl.pathname);
        // console.log("Req auth", request.nextauth.token);

        if(request.nextUrl.pathname.startsWith("/product/seller/") && 
            request.nextauth.token?.role !== "seller") {
                return NextResponse.rewrite(
                    new URL("/denied", request.url)
                )
            }
        
        if(request.nextUrl.pathname.startsWith("/registerPage") && 
                !! request.nextauth.token) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

        return NextResponse.next(); // Allow other requests to proceed

    }, {
        callbacks: {
            authorized: ({token}) => !!token
        }
    }
)

export const config = {
    matcher: [
        "/product/seller/:path*", "/product/buyer/:path*"
    ]
}