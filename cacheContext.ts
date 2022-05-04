import React from "react";
import { Action, CacheState, MountFunction } from "./global";

interface IValue {
  cacheStates: CacheState;
  dispatch: React.Dispatch<Action>;
  mount: MountFunction;
}

const CacheContext = React.createContext<IValue>({
  cacheStates: {},
  dispatch: () => {},
  mount: () => {},
});

export default CacheContext;
