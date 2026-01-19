import { cookies } from "next/headers";
import React from "react";
import { ThemeInfoStatic } from "../runtime-data/page";

export default async function GetStaticCookies() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";
  console.log(theme);
  return <ThemeInfoStatic theme={theme} />;
}
