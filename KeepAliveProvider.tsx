import CacheContext from "./CacheContext";
import cacheReducer from "./cacheReducer";
import CacheType from "./cache-type";
import { CacheState, MountFunction } from "./global";
import { FC, ReactNode, useCallback, useReducer } from "react";

const initialState: CacheState = {};

interface IProps {
  children: ReactNode;
}

const KeepAliveProvider: FC<IProps> = props => {
  const [cacheStates, dispatch] = useReducer(cacheReducer, initialState);
  const mount = useCallback<MountFunction>(({ cacheId, reactElement }) => {
    if (!cacheStates[cacheId]) {
      dispatch({
        type: CacheType.CREATE,
        payload: { cacheId, reactElement },
      });
    }
  }, [cacheStates]);
  return (
    <CacheContext.Provider value={{ cacheStates, dispatch, mount }}>
      {props.children}
      {Object.values(cacheStates).map(state => {
        const { cacheId, reactElement } = state;
        return (
          <div
            id={`cache-${cacheId}`}
            key={cacheId}
            ref={divDom => {
              const cacheState = cacheStates[cacheId];
              if (divDom && !cacheState.doms) {
                const doms = Array.from(divDom.childNodes);
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
