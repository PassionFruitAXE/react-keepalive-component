import CacheContext from "./CacheContext";
import CacheType from "./cache-type";
import { useCallback, useContext, useEffect, useRef } from "react";
import { WithKeepAlive } from "./global";

const withKeepAlive: WithKeepAlive = (
  OldComponent,
  { cacheId = window.location.pathname, scroll }
) => {
  return props => {
    const { cacheStates, dispatch, mount, handleScroll } =
      useContext(CacheContext);
    const divRef = useRef<HTMLDivElement>(null);
    const cacheDestroy = useCallback(
      (cacheId: string) => () => {
        dispatch({ type: CacheType.DESTROY, payload: { cacheId } });
      },
      [cacheId]
    );
    useEffect(() => {
      const onScroll = (event: Event) =>
        handleScroll(cacheId, event.target as Element);
      if (divRef.current && scroll) {
        divRef.current.addEventListener(
          "scroll",
          onScroll,
          // ts需要制定target类型，事件的ts无法确定类型
          true
        );
      }
      return divRef.current?.removeEventListener("scroll", onScroll);
    }, [handleScroll]);
    useEffect(() => {
      const cacheState = cacheStates[cacheId];
      if (
        cacheState &&
        cacheState.doms &&
        cacheState.status !== CacheType.DESTROY
      ) {
        const doms = cacheState.doms;
        doms.forEach(dom => {
          if (divRef.current) {
            divRef.current.appendChild(dom);
            if (scroll && cacheState.scrolls[dom.baseURI]) {
              dom.scrollTop = cacheState.scrolls[dom.baseURI];
            }
          }
        });
      } else {
        mount({
          cacheId,
          reactElement: <OldComponent {...props} cacheDestroy={cacheDestroy} />,
        });
      }
    }, [props, cacheStates, mount]);
    return <div id={`withKeepAlive${cacheId}`} ref={divRef} />;
  };
};

export default withKeepAlive;
