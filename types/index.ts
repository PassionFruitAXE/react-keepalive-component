import { Keepalive } from "../hooks/useKeepalive";
import { ReactElement } from "react";
import { Status } from "../constant/enum";

export type TCacheId = number | string;

export type TLoad = (currentNode: HTMLElement | null) => void;

export type TChildren =
  | ReactElement
  | null
  | ((props?: Record<string, unknown>) => ReactElement | null);

export type TUpdater = Record<string, unknown>;

export type TCacheComponent = {
  cacheId: TCacheId;
  load: TLoad;
  status: Status;
  children: TChildren;
  updater: TUpdater;
};

export type TContextValue = Pick<
  Keepalive,
  "cacheDispatch" | "hasAliveStatus"
> & {
  cacheDestroy: (payload: Parameters<Keepalive[Status.DESTROYING]>[0]) => void;
};
