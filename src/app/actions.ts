"use server";

import { getSession } from "@/lib/sessions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export const login = async (body: any) => {
//   const session = await getSession();

//   const formEmail = body.email as string;
//   const formPassword = body.password as string;

//   // CHECK USER IN THE DB
//   // const user = await db.getUser({username,password})

//   if (formEmail !== email || formPassword !== password) {
//     return { error: "Wrong Credentials!" };
//   }

//   session.userId = "1";
//   session.email = formEmail;

//   session.isLoggedIn = true;

//   await session.save();
// };

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

// export const changeEmail = async (formData: FormData) => {
//   const session = await getSession();

//   const newEmail = formData.get("email") as string;

//   email = newEmail;

//   session.email = email;
//   await session.save();
//   revalidatePath("/profile");
// };
