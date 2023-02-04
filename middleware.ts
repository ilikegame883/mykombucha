import { getToken } from "next-auth/jwt";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

//check if user has created a username after login with google/facebook provider
//redirect to username page if username is not created
export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });
  //check if user is not logged in and
  //if user is logged in with credentials provider
  if (!token || token?.provider === "credentials") return;

  //check if username is not created
  if (!token?.username) {
    const url = new URL(`/username`, request.url);
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/users/:path*"] };
