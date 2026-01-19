import Image from "next/image";
import staticImage from "../../public/next.svg";
import { Suspense } from "react";
import { connection } from "next/server";

// 5.0 Next js cannot determines the non deterministic operations like Math.random(), Date.now(), etc. is static or dynamic. You keep a random number static or dynamic which is upto u. So u have to mark it.
export default async function NonDeterministicOperations() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center mb-5">
            Next.js 16 Cache Component Concept
          </h1>
          <p className="text-center mb-5">Non-Deterministic Operations</p>

          {/* Static content */}
          {/* 5.2 call the StaticComponent without suspense boundary because we use use cache to mark it static */}
          <StaticComponent />

          {/* 5.4 Implement the RandomNumber without suspense boundary which is static because of use cache */}
          <RandomNumber />

          {/* 5.6 Implement with suspense boundary */}
          <Suspense fallback={<div>Loading...</div>}>
            <RandomNumber2 />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// 5.1 Create a dynamic component and make it static using use cache
async function StaticComponent() {
  "use cache";
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const word = await response.json();
  return (
    <div>
      <h4 className="mb-5">Static Content: {word}</h4>
    </div>
  );
}

// 5.3 created a non deterministic component RandomNumber and mark it as static using use cache. If u not use use cache then it will show error
async function RandomNumber() {
  "use cache";
  const random = Math.floor(Math.random() * 1000);

  return (
    <div className="w-full bg-amber-400 p-2 mt-4">
      Random Numbers (static): {random}
    </div>
  );
}

// 5.5 To make the random number dynamic we use connection api from nextjs
async function RandomNumber2() {
  await connection();
  const random = Math.floor(Math.random() * 1000);

  return (
    <div className="w-full bg-red-400 p-2 mt-4">
      Random Numbers (dynamic): {random}
    </div>
  );
}
