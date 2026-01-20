## Nextjs Cache Component Concept

<p>The next js cache component is a recent update of next js 16.1.3. Next js has main four caching mechanisms.</p>
<p>1. Request Memoization</p>
<p>2. Data Cache</p>
<p>3. Full Route Cache</p>
<p>4. Router Cache</p>

### Why we need cache component?

- The problem of the four caching mechanism is a single call of dynamic function like cookies() or headers() make the entire route dynamic, loosing all static benefits unexpectedly.

-But using the cache componenet you can cache component or function level and compose static and dynamic content in a single route

- In nextjs by default mental model is everything is static by default.

- but in nextjs cache component is opposite, by default it is dynamic and to make static we have to mark as static.

- Using Cache components, Nextjs is stable and predictable.

- Instanat static shell delivery (TTFB = Time to first byte and FCP)

### Partial Prerendering (PPR)

- Cache Components implement Partial Prerendering (PPR), which prerenders static HTML shell and sent to the browser with dynamic content updating as it becomes ready.

#### Example

```
export default function Dashboard() {
return (
<>
 <Navbar/>
 <StaticContent />
 <Suspense fallback={<p>Loading feed...</p>}>
    <DynamicContent />
 </Suspense>
</>
)
}

```

### Flow

1.0 Created a database.json file in server folder and install "npm install json-server" save data and run "npx json-server db.json -p 8000"

2.0 in home page we will fetch data from api and show dynamic content successfully
// https://random-word-api.herokuapp.com/word

2.1 Show dynamic content

2.2 also created static content later which will be used later for another purpose

3.0 to enable cache components write the following line and after doing that it will show error. The previous mental model was try to make everything static as possible but now the mental model is dynamic by default.

3.1 previously this type of fetch consider as static i.e it was cached but after enabling cacheComponents it consider as dynamic i.e uncached that's why it is showing error.

3.2.0 so to make it static we will make it in suspense boundary i.e use "use cache" to mark it static then the error will be resolved because in cache Components by default are dynamic

3.2.1 We can also use in page level

3.3.0 If the page is pure static by uncomment the static section and comment the use cache, 2.1 dynamic content and 3.1 fetch data then the page will be static without error. Because next js intelligently knows that the page is static and completely render it as static content.

3.3.1 comment this line to make it pure static

3.3.2 Now if u change any data from the db u don't get the updated data because the page is statically rendered in Dynamic content.

4.0 To add dynamic content in a static content use with suspense boundary. So first created a static component MultipleDynamicStatic.

4.1 Static content

4.2 Dynamic content

4.3 Implement the dynamic content with suspense boundary

4.4 If u run npm run build then u will see in the terminal "/multiple-dynamic-static" with half moon sign which is partially prerender and home page static that is we are getting both static and Dynamic Content in one page. Now if u change any data from the db u get the updated data because the page is dynamically rendered.

4.5 Now if u use the static content by uncomment the static section and comment the Dynamic Content and fetch data then run npm run build u will get the full page as static. Remember one thing if anything wrapped with suspense is not be dynamic it may be static. True dynamic run time data i.e cookies, headers are also wrapped with suspense.

#### Note: Runtime data i.e cookies, headers etc cannot be static and use with Suspense boundary

5.0 Next js cannot determines the non deterministic operations like Math.random(), Date.now(), etc. is static or dynamic. To keep non deterministic operations static or dynamic which is upto u. So u have to mark it.

5.1 Create a dynamic component and make it static using use cache

5.2 call the StaticComponent without suspense boundary because we use use cache to mark it static

5.3 created a non deterministic component RandomNumber and mark it as static using use cache. If u not use "use cache" then it will show error

5.4 Implement the RandomNumber without suspense boundary which is static because of use cache

5.5 To make the random number dynamic we use connection api from nextjs

5.6 Implement with suspense boundary as it is true dynamic nor it will show error

6.0 For runtime data we use cookies() and headers() functions which are true dynamic now we will learn how to make it static or dynamic.

6.1 created a runtime dynamic component ThemeInfoDynamic and we will get the cookie value from it. as the cookies is runtime data so nextjs 100% sure that it's a dynamic component. You cannot make it static using use-cache.

6.2 implement with suspense boundary because of dynamic runtime data

6.3 To make the run time data static so created a component ThemeInfoStatic and get the cookie value and send it as props to GetStaticCookies component

6.4 Make a GetStaticCookies and use "use cache" to make the component static

6.5 implement with suspense boundary as it is static runtime data it also shows error

7.0 As we use "use cache" to mark any dynamic component static but we want to revalidate the data of this type of component using cacheLife function. Here we work with StaticWordTimeBaseRevalidation. There are various way to revalidate the static component. Timebase revalidation such as cacheLife("minutes"), cacheLife("seconds"), cacheLife("hours") etc and on demand revalidation such as revalidateTag, revalidatePath. Now if u reload after one minutes u will get the updated data in StaticWordTimeBaseRevalidation but the StaticWordComponent is unchanged.

7.0.1 use cacheLife time based revalidation to revalidate the static "use cache" component

7.0.2 Implement the StaticWordTimeBaseRevalidation without suspense boundary

7.1.0 use revalidatePath to revalidate the static use cached component so created a StaticWordRevalidatePathComponent

7.1.1 invalidate using onDemand Revalidation revalidatePath

7.1.2 use revalidatePath

7.1.3 now call the api in another tab "http://localhost:3000/non-deterministic-operations/api/invalidate" now reload the page "http://localhost:3000/non-deterministic-operations" and u will get the updated data and it's cached. Every time u should follow the same process to revalidate the data by revalidatePath. Best practice is to use button to call the api.

7.1.4 implement the StaticWordRevalidatePathComponent

#### Note: In path based revalidation entire page is revalidated. To more granular control use revalidateTag.

7.2.0 Revalidate the data using revalidateTag so created a component StaticWordRevalidateTagComponent

7.2.1 invalidate using onDemandRevalidation revalidateTag so commented the path based revalidation 7.1.1

7.2.2 use cacheTag and use the same tag name as used in invalidate api's revalidateTag. Now follow the same process call the api in another tab "http://localhost:3000/non-deterministic-operations/api/invalidate" now reload the page "http://localhost:3000/non-deterministic-operations" and u will get the updated data.

7.1.4 implement the StaticWordRevalidatePathComponent

### Final Note

- Enabling cache component, to make a dynamic page static, you have to mark it as static using use-cache at page level or component level.
- but in case of pure static page next js intelligently marks it as static.
- to implement a dynamic content in a static page we have to use suspense boundary no use of use-cache.
- Dynamic content or static content both are wrapped with Suspense boundary.
- Nextjs cannot determine the non deterministic operations like Math.random(), Date.now(), etc. is static or dynamic. To keep non deterministic operations static we use only use-cache.
- To keep non deterministic operations dynamic we use connection() api with suspense boundary.
- To revalidate the static "use cache" component in non deterministic operations for time based revalidation e.g random word generator we use cacheLife() api without suspense boundary.
- To revalidate the static "use cache" component in non deterministic operations for on demand revalidation e.g random word generator we use revalidatePath() or revalidateTag() api without suspense boundary.
- Run time data e.g cookies, headers are true dynamic and cannot be made static using use-cache.
- To make the run time data static we have to implement it with pass as props to "use cache" component.
