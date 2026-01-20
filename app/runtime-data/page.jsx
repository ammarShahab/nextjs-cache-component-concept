import { cookies } from "next/headers";
import React, { Suspense } from "react";

// 6.0 For runtime data we use cookies() and headers() functions which are true dynamic now we will learn how to make it static or dynamic.
export default function RuntimeData() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center mb-5">
            Next.js 16 Cache Component Concept
          </h1>
          <p className="text-center mb-5">Run Time Data</p>
        </div>
        {/* 6.2 implement with suspense boundary because of dynamic runtime data*/}
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeInfoDynamic />
        </Suspense>
        {/* 6.5  implement with suspense boundary as it is static runtime data it also shows error*/}
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeInfoStatic />
        </Suspense>
      </div>
    </div>
  );
}

// 6.1 created a runtime component ThemeInfoDynamic and we will get the cookie value from it. as the cookies is runtime data so nextjs 100% sure that it's a dynamic component. You cannot make it static using use-cache.
async function ThemeInfoDynamic() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";
  console.log(theme);

  return (
    <div>
      <h3 className="w-full bg-red-400 p-2 mt-4 text-center">
        Runtime Data (Dynamic): {theme}
      </h3>
    </div>
  );
}
// 6.3 To make the run time data static we need to send as props. So created a component ThemeInfoStatic and get the cookie value and send it as props to GetStaticCookies component
async function ThemeInfoStatic() {
  const cookieStore = await cookies();
  let theme = cookieStore.get("theme")?.value ?? "light";

  if (!theme) {
    theme = "dark";
    cookieStore.set("theme", theme);
  }
  console.log(theme);
  return <GetStaticCookies theme={theme} />;
}

// 6.4 Make it static using use cache
async function GetStaticCookies({ theme }) {
  "use cache";
  console.log(theme);
  // practically there will be a fetch call here
  // const data = await fetchUserTheme(theme)

  return (
    <div>
      <h3 className="w-full bg-green-400 p-2 mt-4 text-center">
        Runtime Data (Static): {theme}
      </h3>
    </div>
  );
}
