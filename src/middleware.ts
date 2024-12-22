// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessions";

// Define valid role types
type UserRole = "admin" | "doctor" | "patient" | "nurse";

// Define protected routes configuration
interface ProtectedRouteConfig {
  roles: UserRole[];
  loginRequired: boolean;
}

// Define protected routes and their required roles
const protectedRoutes: Record<string, ProtectedRouteConfig> = {
  // Admin routes
  "/dashboard/admin": {
    roles: ["admin"],
    loginRequired: true,
  },
  "/admin/users": {
    roles: ["admin"],
    loginRequired: true,
  },
  "/admin/settings": {
    roles: ["admin"],
    loginRequired: true,
  },

  // Doctor routes
  "/dashboard/doctor": {
    roles: ["doctor"],
    loginRequired: true,
  },

  "/dashboard/patient": {
    roles: ["doctor"],
    loginRequired: true,
  },

  // Patient routes
  "/patient/dashboard": {
    roles: ["patient"],
    loginRequired: true,
  },
  "/patient/appointments": {
    roles: ["patient"],
    loginRequired: true,
  },
  "/patient/records": {
    roles: ["patient"],
    loginRequired: true,
  },

  // Nurse routes
  "/nurse/dashboard": {
    roles: ["nurse"],
    loginRequired: true,
  },

  // Shared routes
  "/profile": {
    roles: ["admin", "doctor", "patient", "nurse"],
    loginRequired: true,
  },
  "/appointments": {
    roles: ["admin", "doctor", "patient", "nurse"],
    loginRequired: true,
  },
};

// Public routes that should redirect to dashboard if user is already logged in
const publicOnlyRoutes = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // try {
  //   // Get session
  //   const session = await getSession();
  //   const isAuthenticated = session?.isLoggedIn === true;
  //   const userRole = session?.role as UserRole | undefined;
  //   // Create URLs for redirects
  //   const loginUrl = new URL("/login", request.url);
  //   const dashboardUrl = new URL(`/${userRole}/dashboard`, request.url);
  //   // Handle public only routes (login, register, etc.)
  //   if (publicOnlyRoutes.includes(pathname)) {
  //     if (isAuthenticated) {
  //       return NextResponse.redirect(dashboardUrl);
  //     }
  //     return NextResponse.next();
  //   }
  //   // Check if current route is protected
  //   const routeConfig = protectedRoutes[pathname];
  //   if (routeConfig) {
  //     // Check if login is required
  //     if (routeConfig.loginRequired && !isAuthenticated) {
  //       // Store the attempted URL to redirect back after login
  //       loginUrl.searchParams.set("callbackUrl", pathname);
  //       return NextResponse.redirect(loginUrl);
  //     }
  //     // Check role-based access
  //     if (
  //       isAuthenticated &&
  //       userRole &&
  //       !routeConfig.roles.includes(userRole)
  //     ) {
  //       // Redirect to user's dashboard if they don't have access
  //       return NextResponse.redirect(dashboardUrl);
  //     }
  //   }
  //   // Handle root route
  //   if (pathname === "/") {
  //     if (!isAuthenticated) {
  //       return NextResponse.redirect(loginUrl);
  //     }
  //     return NextResponse.redirect(dashboardUrl);
  //   }
  //   // Add security headers to all responses
  //   const response = NextResponse.next();
  //   response.headers.set("X-Frame-Options", "DENY");
  //   response.headers.set("X-Content-Type-Options", "nosniff");
  //   response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  //   response.headers.set(
  //     "Strict-Transport-Security",
  //     "max-age=31536000; includeSubDomains"
  //   );
  //   return response;
  // } catch (error) {
  //   console.error("Middleware error:", error);
  //   // Redirect to login page if there's an error
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

// Configure middleware to run on specific paths
export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * - public folder
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  // ],
};
