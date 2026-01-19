import Image from "next/image";
import staticImage from "../../public/next.svg";
import { Suspense } from "react";

// 4.0 To  add dynamic content in a static content use with suspense boundary. So first created a static component MultipleDynamicStatic.
export default async function NonDeterministicOperations() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center mb-5">
            Next.js 16 Cache Component Concept
          </h1>
          <p className="text-center mb-5">Non-Deterministic Operations</p>

          {/* 4.3 Implement the dynamic content with suspense boundary */}
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicContent />
          </Suspense>
          {/* 4.1 Static content */}
          {/* Static */}
          <div>
            <h4 className="mb-5">Static Content</h4>
            <div>
              <Image
                src={staticImage}
                alt="Static product image"
                width={200}
                height={200}
              />
            </div>
            <h4 className="mt-5">Static Product</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4.2 Dynamic content
async function DynamicContent() {
  const response = await fetch("http://localhost:8000/products");
  const products = await response.json();
  // console.log(products);
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <h4>Dynamic Content</h4>
          <div>
            <Image
              src={product.image}
              alt="product image"
              width={200}
              height={200}
            />
          </div>
          <h4 className="mt-5">{product.name}</h4>
        </div>
      ))}
      {/* Static */}
      {/* <div>
        <h4 className="mb-5">Static Content</h4>
        <div>
          <Image
            src={staticImage}
            alt="Static product image"
            width={200}
            height={200}
          />
        </div>
        <h4 className="mt-5">Static Product</h4>
      </div> */}
    </div>
  );
}

// 4.4 If u run npm run build then u will see in the terminal "/multiple-dynamic-static" with half moon sign which is partially prerender and home page static that is we are getting both static and Dynamic Content in one page. Now if u change any data from the db u get the updated data because the page is dynamically rendered.

// 4.5 Now if u use the static content by uncomment the static part from the DynamicContent and comment the Dynamic Content and fetch data then run npm run build u will get the full page as static. Remember one thing if anything wrapped with suspense is not be dynamic it may be static. True dynamic run time data i.e cookies, headers are also wrapped with suspense.

// Note: Runtime data i.e cookies, headers etc cannot be static and use with Suspense boundary
