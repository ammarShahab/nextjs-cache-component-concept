import Image from "next/image";
import staticImage from "../public/next.svg";

// 2.0 in home page we will fetch data from api and show dynamic content successfully
// https://random-word-api.herokuapp.com/word

// 3.2.1 We can also use in page level
// "use cache";
export default async function Home() {
  // 3.2.0 so to make it static we will make it in suspense boundary i.e use "use cache" to mark it static then the error will be resolved because in cache Components by default are dynamic
  "use cache";
  // 3.3.1 comment this line to make it pure static
  // "use cache";

  // 3.1 previously this type of fetch consider as static i.e it was cached but after enabling cacheComponents it consider as dynamic i.e uncached that's why it is showing error.
  const response = await fetch("http://localhost:8000/products");
  const products = await response.json();
  // console.log(products);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <h1 className="text-3xl font-bold text-center mb-10">
            Next.js 16 Cache Component Concept
          </h1>
          {/* 2.1 Show dynamic content */}
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
            {/* 2.2 also created static content later which will be used later for another purpose*/}

            {/* 3.3.0 If the page is pure static by uncomment the static section and comment the use cache, 2.1 dynamic content and 3.1 fetch data  then the page will be static without error. Because next js intelligently knows that the page is static and completely render it as static content.*/}
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
        </div>
      </main>
    </div>
  );
}

// 3.3.2 Now if u change any data from the db u don't get the updated data because the page is statically rendered.
