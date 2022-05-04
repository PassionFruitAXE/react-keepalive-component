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

