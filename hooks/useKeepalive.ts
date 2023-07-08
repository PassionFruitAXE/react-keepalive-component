import { Status } from "../constant/enum";
import { TCacheComponent, TCacheId } from "../types";
import { useRef, useState } from "react";

export class Keepalive {
  cacheList: TCacheComponent[];
  kid: number;

  constructor(
    public setState: React.Dispatch<React.SetStateAction<unknown>>,
    public maxLimit: number
  ) {
    this.cacheList = [];
    this.kid = -1;
  }

  cacheDispatch<T extends Status>({
    type,
    payload,
  }: {
    type: T;
    payload: Parameters<Keepalive[T]>[0];
  }) {
    // 这里暂时没有好办法解决，所以使用any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this[type](payload as any);
    type !== Status.CREATED && this.setState({});
  }

  hasAliveStatus(cacheId: TCacheId) {
    const cacheItem = this.cacheList.find(item => item.cacheId === cacheId);
    if (cacheItem === undefined) return null;
    return cacheItem.status;
  }

  destroyItem(cacheId: TCacheId) {
    const index = this.cacheList.findIndex(item => item.cacheId === cacheId);
    if (index === -1) return;
    if (this.cacheList[index].status === Status.INACTIVE) {
      this.cacheList.splice(index, 1);
    }
  }

  [Status.UPDATE](payload: Pick<TCacheComponent, "cacheId" | "children">) {
    const { cacheId, children } = payload;
    const cacheItem = this.cacheList.find(item => item.cacheId === cacheId);
    if (cacheItem === undefined) return;
    cacheItem.updater = {};
    cacheItem.children = children;
  }

  [Status.CREATED](
    payload: Pick<TCacheComponent, "cacheId" | "load" | "children">
  ) {
    const { children, load, cacheId } = payload;
    const cacheItem = {
      cacheId: cacheId || this.kid,
      load,
      status: Status.CREATED,
      children,
      updater: {},
    };
    this.cacheList.push(cacheItem);
  }

  [Status.DESTROYING](payload: TCacheId | TCacheId[]) {
    if (Array.isArray(payload)) {
      payload.forEach(this.destroyItem.bind(this));
    } else {
      this.destroyItem(payload);
    }
  }

  [Status.BEING_ACTIVE](payload: Pick<TCacheComponent, "cacheId" | "load">) {
    const { cacheId, load } = payload;
    const cacheItem = this.cacheList.find(item => (item.cacheId = cacheId));
    if (cacheItem === undefined) return;
    cacheItem.status = Status.BEING_ACTIVE;
    cacheItem.load = load;
  }

  [Status.BEING_INACTIVE](payload: TCacheId) {
    const cacheItem = this.cacheList.find(item => item.cacheId === payload);
    if (cacheItem !== undefined) {
      cacheItem.status = Status.BEING_INACTIVE;
    }
  }

  [Status.ACTIVATED](payload: TCacheId) {
    const cacheItem = this.cacheList.find(item => item.cacheId === payload);
    if (cacheItem !== undefined) {
      cacheItem.status = Status.ACTIVATED;
    }
  }

  [Status.INACTIVE](payload: TCacheId) {
    const cacheItem = this.cacheList.find(item => item.cacheId === payload);
    if (cacheItem !== undefined) {
      cacheItem.status = Status.INACTIVE;
    }
  }

  [Status.DESTROYED]() {
    throw Error("this function is not support");
  }

  [Status.CLEAR]() {
    throw Error("this function is not support");
  }
}

export function useKeepalive(CACHE_MAX_DEFAULT_LIMIT = 0) {
  const keeper = useRef<Keepalive>();
  const [, setKeepItem] = useState<unknown>();
  if (!keeper.current) {
    keeper.current = new Keepalive(setKeepItem, CACHE_MAX_DEFAULT_LIMIT);
  }
  return keeper.current;
}
