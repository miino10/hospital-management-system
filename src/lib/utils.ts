import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SessionOptions } from "iron-session";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SessionData {
  userId?: string;
  email?: string;
  img?: string;
  role?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "abdi-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
