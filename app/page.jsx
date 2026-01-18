import Image from "next/image";

export default async function Home() {
  const response = await fetch("http://localhost:8000/products");
  const products = await response.json();
  // console.log(products);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold text-center mb-10">
          Next.js 16 Cache Component Concept
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id}>
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
        </div>
      </main>
    </div>
  );
}
