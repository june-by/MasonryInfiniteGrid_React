import React, { PropsWithChildren } from "react";

interface Props {}

const MasonryInfiniteGrid = ({ children }: PropsWithChildren<Props>) => {
  return <div>{children}</div>;
};

export default MasonryInfiniteGrid;
