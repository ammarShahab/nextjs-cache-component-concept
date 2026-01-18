## Nextjs Cache Component Concept

<p>The next js cache component is a recent update of next js 16.1.3. Next js has main four caching mechanisms.</p>
<p>1. Request Memoization</p>
<p>2. Data Cache</p>
<p>3. Full Route Cache</p>
<p>4. Router Cache</p>

- The problem of the four caching mechanism is a single call of dynamic function like cookies() or headers() make the entire route dynamic, loosing all static benefits unexpectedly.

- The cache componenet you can cache component or function level and compose static and dynamic content in a single route
