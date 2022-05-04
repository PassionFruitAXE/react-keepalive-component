import CacheType from "./cache-type";

export type ReactElement = any;
export type DomNode = any;

export type MountFunction = ({
  cacheId,
  reactElement,
}: {
  cacheId: string;
  reactElement: ReactElement;
}) => void;

export interface CacheState {
  [cacheId: string]: {
    cacheId: string; //缓存id
    reactElement: ReactElement; //要渲染的虚拟DOM
    doms: DomNode; //虚拟DOM对应的真实DOM
    status: string;
  };
}

export interface Action {
  type: CacheType;
  payload: {
    cacheId: string;
    reactElement: ReactElement;
    doms?: DomNode;
  };
}
