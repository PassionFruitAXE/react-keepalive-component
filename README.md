# React Component KeepAlive

## Getting Started

```shell
npm i react-component-keepalive-ts
```

## How to use it

package export default `KeepAliveProvider` `withKeepAlive`

Wrap `keepAliveProvider` around it.

Components that need to cache state are passed in through `withKeepAlive(Component)`.

This function returns the same new Component.

Now your component can be cached!

You can also export a cacheDestroy function from the props of the new component. Function accepts a cacheId to destroy the cache.

Example:

```tsx
import home form "./views/Home";
import about form "./views/About";
import { withKeepAlive, KeepAliveProvider } from "react-component-keepalive-ts";

const About = withKeepAlive(about);
const Home = withKeepAlive(home);

const routers = [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

const Router = () => {
  const element = useRoutes(routers);
  return <KeepAliveProvider>{element}</KeepAliveProvider>;
};
```

```tsx
import React from "react";

const Home = (props: any) => {
  return (
    <div>
      <button onClick={props.cacheDestroy("UserList")}>重置UserList</button>
      <button onClick={props.cacheDestroy("UserAdd")}>重置UserAdd</button>
    </div>
  );
};

export default Home;
```
