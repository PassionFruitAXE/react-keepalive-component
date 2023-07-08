import ReactDOM from "react-dom";
import { FC, memo, useEffect, useMemo, useRef } from "react";
import { Keepalive } from "../hooks/useKeepalive";
import { Status } from "../constant/enum";
import { TCacheComponent } from "../types";

type TProps = TCacheComponent & { dispatch: Keepalive["cacheDispatch"] };

const beforeScopeDestroy: Record<string, unknown> = {};

const ScopeItem: FC<TProps> = ({
  cacheId,
  updater,
  children,
  status,
  dispatch,
  load = () => void 0,
}) => {
  const currentDOMref = useRef<HTMLDivElement>(null);
  const renderChildren = [
    Status.BEING_ACTIVE,
    Status.ACTIVATED,
    Status.BEING_INACTIVE,
    Status.INACTIVE,
  ].includes(status)
    ? children
    : () => null;
  const renderElement = (
    <div
      ref={currentDOMref}
      style={{ display: status === Status.INACTIVE ? "none" : "block" }}
    >
      {useMemo(
        () => typeof renderChildren === "function" && renderChildren(),
        [updater]
      )}
    </div>
  );
  useEffect(() => {
    beforeScopeDestroy[cacheId] = function () {
      if (currentDOMref.current)
        document.body.appendChild(currentDOMref.current);
    };
    return () => {
      delete beforeScopeDestroy[cacheId];
    };
  }, []);
  useEffect(() => {
    if (status === Status.BEING_ACTIVE) {
      load && load(currentDOMref.current);
    } else if (status === Status.BEING_INACTIVE && currentDOMref.current) {
      document.body.appendChild(currentDOMref.current);
      dispatch({
        type: Status.INACTIVE,
        payload: cacheId,
      });
    }
  }, [status]);
  return ReactDOM.createPortal(renderElement, document.body);
};

export default memo<TProps>(
  ScopeItem,
  (pre, next) => pre.status === next.status
);
