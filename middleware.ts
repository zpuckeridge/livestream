import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = [
  "/",
  "/sign-in*",
  "/sign-up*",
  "/clip*",
  "/clips",
  "/unauthorised",
  "/api/increment/likes",
  "/api/increment/views",
];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (
    userId !== "user_2PJcfYqloKIOPOUBDjidWNatNpj" &&
    userId !== "user_2Oxo2ani3BAOKgZAboW1YCzW1g3"
  ) {
    const unauthorised = new URL("/unauthorised", request.url);

    return NextResponse.redirect(unauthorised);
  }

  return NextResponse.next();
});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
