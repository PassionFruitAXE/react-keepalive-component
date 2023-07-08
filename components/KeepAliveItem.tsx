import { Status } from "../constant/enum";
import { TCacheComponent, TChildren } from "../types";
import { useKeepaliveContextState } from "../hooks/useKeepaliveContextState";
import {
  cloneElement,
  CSSProperties,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  isValidElement,
} from "react";

function renderWithChildren(children: TChildren): TChildren {
  return (mergeProps?: Record<string, unknown>) => {
    if (children) {
      if (typeof children === "function") {
        return children(mergeProps);
      } else {
        if (isValidElement(children)) {
          return cloneElement(children, mergeProps);
        }
      }
    }
    return null;
  };
}

type TProps = Pick<TCacheComponent, "children" | "cacheId"> & {
  style?: CSSProperties;
};

const KeepaliveItem: FC<TProps> = ({ children, cacheId, style }) => {
  const { cacheDispatch, hasAliveStatus } = useKeepaliveContextState();
  const firstRef = useRef<boolean>(false);
  const parentNodeRef = useRef<HTMLDivElement>(null);

  const load = (currentNode: HTMLElement | null) => {
    currentNode && parentNodeRef.current?.appendChild(currentNode);
  };

  !firstRef.current &&
    !hasAliveStatus(cacheId) &&
    cacheDispatch({
      type: Status.CREATED,
      payload: {
        load,
        cacheId,
        children: renderWithChildren(children),
      },
    });

  useLayoutEffect(() => {
    hasAliveStatus(cacheId) !== Status.INACTIVE &&
      firstRef.current &&
      cacheDispatch({
        type: Status.UPDATE,
        payload: {
          cacheId,
          children: renderWithChildren(children),
        },
      });
  }, []);

  useEffect(() => {
    firstRef.current = true;
    cacheDispatch({
      type: Status.BEING_ACTIVE,
      payload: {
        cacheId,
        load,
      },
    });
    return () => {
      cacheDispatch({
        type: Status.BEING_INACTIVE,
        payload: cacheId,
      });
    };
  }, []);

  return (
    <div className={`cache-${cacheId}`} ref={parentNodeRef} style={style} />
  );
};

export default KeepaliveItem;
