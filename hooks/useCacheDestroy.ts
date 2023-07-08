import { useKeepaliveContextState } from "./useKeepaliveContextState";

export function useCacheDestroy() {
  const { cacheDestroy } = useKeepaliveContextState();
  return cacheDestroy;
}
