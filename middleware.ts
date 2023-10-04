import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },

  publicRoutes: [
    "/",
    "/sign-in*",
    "/sign-up*",
    "/clip*",
    "/clips",
    "/unauthorised",
    "/api/increment/likes",
    "/api/increment/views",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
