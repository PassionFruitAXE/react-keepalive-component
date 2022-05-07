import React from "react";
import { Action, CacheState, MountFunction, ScrollFunction } from "./global";

interface IValue {
  cacheStates: CacheState;
  dispatch: React.Dispatch<Action>;
  mount: MountFunction;
  handleScroll: ScrollFunction;
}

const CacheContext = React.createContext<IValue>({
  cacheStates: {},
  dispatch: () => {},
  mount: () => {},
  handleScroll: () => {},
});

export default CacheContext;
