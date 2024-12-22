// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessions";
import { hash, compare } from "bcrypt";
import { z } from "zod";
import { User, UserRole } from "@/app/(auth)/login/page";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Mock user database - replace with your actual database
const users: Record<string, User> = {
  "admin@hospital.com": {
    userId: "1",
    email: "admin@hospital.com",
    hashedPassword: "", // Will be set in init function
    role: "admin",
  },
  "patient@example.com": {
    userId: "2",
    email: "patient@example.com",
    hashedPassword: "", // Will be set in init function
    role: "patient",
  },
  "doctor@hospital.com": {
    userId: "3",
    email: "doctor@hospital.com",
    hashedPassword: "", // Will be set in init function
    role: "doctor",
  },
  "nurse@hospital.com": {
    userId: "4",
    email: "nurse@hospital.com",
    hashedPassword: "", // Will be set in init function
    role: "nurse",
  },
};

// Initialize mock users with hashed passwords
async function initUsers() {
  users["admin@hospital.com"].hashedPassword = await hash("admin123", 10);
  users["patient@example.com"].hashedPassword = await hash("patient123", 10);
  users["doctor@hospital.com"].hashedPassword = await hash("doctor123", 10);
  users["nurse@hospital.com"].hashedPassword = await hash("nurse123", 10);
}

// Call this when your application starts
initUsers();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const user = users[body.email];
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await compare(body.password, user.hashedPassword);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    const session = await getSession();
    session.userId = user.userId;
    session.email = user.email;
    session.role = user.role;
    session.isLoggedIn = true;

    await session.save();

    // Get the appropriate redirect URL based on role
    const redirectUrl = getRoleBasedRedirectUrl(user.role);

    return NextResponse.json(
      {
        message: "Login successful",
        redirectUrl,
        role: user.role,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": `session=${session.userId}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getRoleBasedRedirectUrl(role: UserRole): string {
  const roleRedirects: Record<UserRole, string> = {
    admin: "/admin/dashboard",
    patient: "/patient/dashboard",
    doctor: "/doctor/dashboard",
    nurse: "/nurse/dashboard",
  };

  return roleRedirects[role] || "/dashboard";
}
