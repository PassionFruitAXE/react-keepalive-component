import { KeepaliveContext } from "../store/Keepalive";
import { useContext } from "react";

export function useKeepaliveContextState() {
  const { cacheDispatch, hasAliveStatus, cacheDestroy } =
    useContext(KeepaliveContext);
  return { cacheDispatch, hasAliveStatus, cacheDestroy };
}
