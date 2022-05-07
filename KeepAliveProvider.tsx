import CacheContext from "./CacheContext";
import cacheReducer from "./cacheReducer";
import CacheType from "./cache-type";
import { CacheState, MountFunction, ScrollFunction } from "./global";
import { FC, ReactNode, useCallback, useReducer } from "react";

const initialState: CacheState = {};

interface IProps {
  children: ReactNode;
}

const KeepAliveProvider: FC<IProps> = props => {
  const [cacheStates, dispatch] = useReducer(cacheReducer, initialState);
  const mount = useCallback<MountFunction>(
    ({ cacheId, reactElement }) => {
      if (!cacheStates[cacheId]) {
        dispatch({
          type: CacheType.CREATE,
          payload: { cacheId, reactElement },
        });
      } else {
        if (cacheStates[cacheId].status === CacheType.DESTROY) {
          cacheStates[cacheId].doms?.forEach(dom => {
            if (dom && dom.parentNode) {
              dom.parentNode.removeChild(dom);
            }
          });
          dispatch({
            type: CacheType.CREATE,
            payload: { cacheId, reactElement },
          });
        }
      }
    },
    [cacheStates]
  );
  const handleScroll = useCallback<ScrollFunction>(
    (cacheId, target) => {
      if (cacheStates[cacheId] && target) {
        const { scrolls } = cacheStates[cacheId];
        scrolls[target.baseURI] = target.scrollTop;
      }
    },
    [cacheStates]
  );
  return (
    <CacheContext.Provider
      value={{ cacheStates, dispatch, mount, handleScroll }}
    >
      {props.children}
      {Object.values(cacheStates)
        .filter(cacheState => cacheState.status !== CacheType.DESTROY)
        .map(state => {
          const { cacheId, reactElement } = state;
          return (
            <div
              id={`cache-${cacheId}`}
              key={cacheId}
              ref={divDom => {
                const cacheState = cacheStates[cacheId];
                if (
                  divDom &&
                  (!cacheState.doms || cacheState.status === CacheType.DESTROY)
                ) {
                  const doms = Array.from(divDom.children);
                  dispatch({
                    type: CacheType.CREATED,
                    payload: { cacheId, reactElement, doms },
                  });
                }
              }}
            >
              {reactElement}
            </div>
          );
        })}
    </CacheContext.Provider>
  );
};

export default KeepAliveProvider;
