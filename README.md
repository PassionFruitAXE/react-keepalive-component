# React Component KeepAlive

## Getting Started

```shell
npm i react-component-keepalive-ts
```

## How to use it

package export default `KeepaliveProvider` `withKeepAlive` `KeepaliveItem` `useCacheDestroy`

Wrap `keepaliveProvider` around it.

Components that need to cache state are passed in through `withKeepalive(Component, cacheId)`

This function returns the same new Component.

or use 

```tsx
<KeepaliveItem cacheId={"cache"}>
    <Item/>
<KeepaliveItem/>
```

Now your component can be cached!

You can also export a cacheDestroy function from the props of the new component. Function accepts a cacheId to destroy the cache.

Example:

```tsx
import React from "react";
import { KeepaliveProvider, KeepaliveItem, withKeepalive, useCacheDestroy } from "react-component-keepalive-ts"

const Item = () => (
   <div>
      <h2>Hello<h2/>
      <button onClick={cacheDestroy("cache")}>重置about</button>
    </div>
)


const CacheItem = () => (
  <KeepaliveItem cacheId={"cache"}>
    <Item/>
  <KeepaliveItem/>
)

// or

const CacheItem = withKeepalive({
  Component: Item,
  cacheId: "cache"
})

const Home = (props: any) => {
  const cacheDestroy = useCacheDestroy();
  return (
    <KeepaliveProvider>
      <CacheItem/>
    </KeepaliveProvider>
  );
};

export default Home;
```
