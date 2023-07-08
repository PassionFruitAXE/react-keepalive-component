import ScopeItem from "../components/ScopeItem";
import { createContext, FC, ReactNode, useEffect, useMemo } from "react";
import { Status } from "../constant/enum";
import { TContextValue } from "../types";
import { useKeepalive } from "../hooks/useKeepalive";

type TProps = {
  children: ReactNode;
};

const defaultValue: TContextValue = {
  cacheDispatch: () => void 0,
  hasAliveStatus: () => null,
  cacheDestroy: () => void 0,
};

const KeepaliveContext = createContext(defaultValue);

const KeepaliveProvider: FC<TProps> = ({ children }) => {
  const keeper = useKeepalive();
  const { cacheList, cacheDispatch, hasAliveStatus } = keeper;
  const renderChildren = children;
  useEffect(() => {
    return () => {
      try {
        // for (let key in beforeScopeDestroy) {
        //   beforeScopeDestroy[key]();
        // }
      } catch (e) {}
    };
  }, []);
  const cachedValue = useMemo<TContextValue>(() => {
    return {
      cacheDispatch: cacheDispatch.bind(keeper),
      hasAliveStatus: hasAliveStatus.bind(keeper),
      cacheDestroy: payload => {
        cacheDispatch.call(keeper, {
          type: Status.DESTROYING,
          payload,
        });
      },
    };
  }, [keeper]);

  return (
    <KeepaliveContext.Provider value={cachedValue}>
      {renderChildren}
      {cacheList.map(item => (
        <ScopeItem
          {...item}
          dispatch={cacheDispatch.bind(keeper)}
          key={item.cacheId}
        />
      ))}
    </KeepaliveContext.Provider>
  );
};

export { KeepaliveContext, KeepaliveProvider };
