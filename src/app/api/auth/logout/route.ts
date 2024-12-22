import { getSession } from "@/lib/sessions";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getSession();
  console.log(session);

  // Ensure session object and destroy method exist
  if (!session || typeof session.destroy !== "function") {
    return NextResponse.json(
      { message: "Session not found or destroy method invalid" },
      { status: 400 }
    );
  }

  // Destroy the session
  session.destroy();

  // Respond with success
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
