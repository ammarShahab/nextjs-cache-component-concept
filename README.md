## Nextjs Cache Component Concept

<p>The next js cache component is a recent update of next js 16.1.3. Next js has main four caching mechanisms.</p>
<p>1. Request Memoization</p>
<p>2. Data Cache</p>
<p>3. Full Route Cache</p>
<p>4. Router Cache</p>

### Why we need cache component?

- The problem of the four caching mechanism is a single call of dynamic function like cookies() or headers() make the entire route dynamic, loosing all static benefits unexpectedly.

-But using the cache componenet you can cache component or function level and compose static and dynamic content in a single route

- In nextjs by default mental model is everything is static by default but to make it dynamic we have to mark dynamic.

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

1. Created a database.json file in server folder and install "npm install json-server" save data and run "npx json-server db.json -p 8000"

2.0

### Final Note

- Enabling cache component, to make a dynamic page static, you have to mark it as static using use-cache at page level or component level.
- but in case of pure static page next js intelligently marks it as static.
- to implement a dynamic content in a static page we have to use suspense boundary.
- Dynamic content or static content is wrapped with Suspense boundary.
