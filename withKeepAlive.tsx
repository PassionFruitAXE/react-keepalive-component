import CacheContext from "./CacheContext";
import react, { FC, useContext, useEffect, useRef } from "react";
import { DomNode, ReactElement } from "./global";

type WithKeepAlive = (
  OldComponent: ReactElement,
  { cacheId }: { cacheId: string }
) => FC<{ [key: string]: any }>;

const withKeepAlive: WithKeepAlive = (
  OldComponent,
  { cacheId = window.location.pathname }
) => {
  return props => {
    const { cacheStates, mount } = useContext(CacheContext);
    const divRef = useRef<DomNode>(null);
    useEffect(() => {
      const cacheState = cacheStates[cacheId];
      if (cacheState && cacheState.doms) {
        const doms = cacheState.doms;
        doms.forEach((dom: DomNode) => divRef.current.appendChild(dom));
      } else {
        mount({ cacheId, reactElement: <OldComponent {...props} /> });
      }
    }, [props, cacheStates, mount]);
    return <div id={`withKeepAlive${cacheId}`} ref={divRef} />;
  };
};

export default withKeepAlive;
