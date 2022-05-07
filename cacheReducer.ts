import CacheType from "./cache-type";
import { Action, CacheState } from "./global";

const cacheReducer = (cacheStates: CacheState, action: Action): CacheState => {
  const { cacheId, reactElement, doms } = action.payload;
  switch (action.type) {
    case CacheType.CREATE:
      return {
        ...cacheStates,
        [cacheId]: {
          cacheId,
          reactElement,
          doms: undefined,
          status: CacheType.CREATE,
          scrolls: {},
        },
      };
    case CacheType.CREATED:
      return {
        ...cacheStates,
        [cacheId]: {
          ...cacheStates[cacheId],
          doms: doms,
          status: CacheType.CREATED,
        },
      };
    case CacheType.DESTROY:
      return {
        ...cacheStates,
        [cacheId]: {
          ...cacheStates[cacheId],
          status: CacheType.DESTROY,
        },
      };
    default:
      return cacheStates;
  }
};

export default cacheReducer;
