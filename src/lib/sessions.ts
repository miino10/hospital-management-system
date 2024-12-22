import { getIronSession } from "iron-session";
import { defaultSession, SessionData, sessionOptions } from "./utils";
import { cookies } from "next/headers";

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB

  return session;
};
