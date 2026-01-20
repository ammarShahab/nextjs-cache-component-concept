import { Suspense } from "react";
import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";

// 5.0 Next js cannot determines the non deterministic operations like Math.random(), Date.now(), etc. is static or dynamic. To keep non deterministic operations static or dynamic which is upto u. So u have to mark it.
export default function NonDeterministicOperations() {
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
          <StaticWordComponent />

          {/* 5.4 Implement the RandomNumber without suspense boundary which is static because of use cache */}
          <RandomNumberStatic />

          {/* 5.6 Implement with suspense boundary as it is true dynamic nor it will show error*/}
          <Suspense fallback={<div>Loading...</div>}>
            <RandomNumberDynamic />
          </Suspense>

          {/* 7.0.2 Implement the  StaticWordTimeBaseRevalidation without suspense boundary*/}
          <StaticWordTimeBaseRevalidation />

          {/* 7.1.3 implement the StaticWordRevalidatePathComponent*/}
          <StaticWordRevalidatePathComponent />
          <StaticWordRevalidateTagComponent />
        </div>
      </div>
    </div>
  );
}

// 5.1 Create a dynamic component and make it static using use cache
async function StaticWordComponent() {
  "use cache";

  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const word = await response.json();
  return (
    <div>
      <h4 className="mb-5">Static Content: {word}</h4>
    </div>
  );
}

// 5.3 created a non deterministic component RandomNumber and mark it as static using use cache. If u not use "use cache" then it will show error
async function RandomNumberStatic() {
  "use cache";
  const random = Math.floor(Math.random() * 1000);

  return (
    <div className="w-full bg-amber-400 p-2 mt-4">
      Random Numbers (static): {random}
    </div>
  );
}

// 5.5 To make the random number dynamic we use connection api from nextjs
async function RandomNumberDynamic() {
  await connection();
  const random = Math.floor(Math.random() * 1000);

  return (
    <div className="w-full bg-red-400 p-2 mt-4">
      Random Numbers (dynamic): {random}
    </div>
  );
}

// 7.0 As we use "use cache" to mark any dynamic component static but we want to revalidate the data of this type of component using cacheLife function. Here we work with StaticWordTimeBaseRevalidation. There are various way to revalidate the static component. Timebase revalidation such as cacheLife("minutes"), cacheLife("seconds"), cacheLife("hours") etc and  on demand revalidation such as revalidateTag, revalidatePath. Now if u reload after one minutes u will get the updated data in StaticWordTimeBaseRevalidation but the StaticWordComponent is unchanged.
async function StaticWordTimeBaseRevalidation() {
  "use cache";
  // 7.0.1 use cacheLife time based revalidation to revalidate the static "use cache" component
  cacheLife("minutes");
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const word = await response.json();
  return (
    <div>
      <h4 className="-full bg-purple-400 p-2 mt-4">
        Static Content With Revalidation (cacheLife): {word}
      </h4>
    </div>
  );
}

// 7.1.0 use revalidatePath to revalidate the static use cached component so created a StaticWordRevalidatePathComponent
async function StaticWordRevalidatePathComponent() {
  "use cache";

  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const word = await response.json();
  return (
    <div>
      <h4 className="-full bg-purple-400 p-2 mt-4">
        Static Content Revalidate with Path: {word}
      </h4>
      <p className="text-xs text-red-500">
        to activate Path based revalidation uncomment the path based api in
        app\non-deterministic-operations\api\invalidate\route.js folder and
        comment the tag based api
      </p>
    </div>
  );
}

// 7.1.3 now call the api in another tab "http://localhost:3000/non-deterministic-operations/api/invalidate" now reload the page "http://localhost:3000/non-deterministic-operations" and u will get the updated data and it's cached. Every time u should follow the same process to revalidate the data by revalidatePath. Best practice is to use button to call the api.
// Note: In path based revalidation entire page is revalidated. To more granular control use revalidateTag.

// 7.2.0 Revalidate the data using revalidateTag so created a component StaticWordRevalidateTagComponent
export async function StaticWordRevalidateTagComponent() {
  "use cache";
  // 7.2.2 use cacheTag and use the same tag name as used in invalidate api's revalidateTag. Now follow the same process call the api in another tab "http://localhost:3000/non-deterministic-operations/api/invalidate" now reload the page "http://localhost:3000/non-deterministic-operations" and u will get the updated data.
  cacheTag("non-deterministic-operations");
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const word = await response.json();
  return (
    <div>
      <h4 className="-full bg-yellow-300 p-2 mt-4">
        Static Content Revalidate with Tag: {word}
      </h4>
      <p className="text-xs text-green-700">
        to check the Tag based revalidation copy the api url
        http://localhost:3000/non-deterministic-operations/api/invalidate and
        paste it in another tab and call it by reload. Now reload the current
        page and u will get the updated random name.
      </p>
    </div>
  );
}
