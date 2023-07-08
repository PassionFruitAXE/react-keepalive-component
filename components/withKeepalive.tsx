import KeepaliveItem from "./KeepAliveItem";
import { CSSProperties, FC } from "react";
import { TCacheComponent } from "../types";

type TProps = Pick<TCacheComponent, "cacheId"> & {
  Component: FC;
  style?: CSSProperties;
};

const withKeepalive: FC<TProps> = ({ cacheId, Component, style }) => {
  Component.displayName = Component.displayName ?? "" + cacheId;
  return (
    <KeepaliveItem cacheId={cacheId} style={style}>
      <Component />
    </KeepaliveItem>
  );
};

export default withKeepalive;
