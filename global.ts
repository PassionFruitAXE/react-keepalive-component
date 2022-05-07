import CacheType from "./cache-type";
import react, { FC, ReactNode } from "react";

export type ReactElement = ReactNode | null;
export type DomNode = Element;

export type WithKeepAlive = (
  OldComponent: React.JSXElementConstructor<any>,
  { cacheId, scroll }: { cacheId: string; scroll?: boolean }
) => FC<{ [key: string]: any }>;

export type MountFunction = ({
  cacheId,
  reactElement,
}: {
  cacheId: string;
  reactElement: ReactElement;
}) => void;

export type ScrollFunction = (cacheId: string, target: Element) => void;

export interface CacheState {
  [cacheId: string]: {
    cacheId: string;
    reactElement: ReactElement;
    doms: Array<DomNode> | undefined;
    status: CacheType;
    scrolls: {
      [domBaseURI: string]: number;
    };
  };
}

export interface Action {
  type: CacheType;
  payload: {
    cacheId: string;
    reactElement?: ReactElement;
    doms?: Array<DomNode> | undefined;
  };
}
