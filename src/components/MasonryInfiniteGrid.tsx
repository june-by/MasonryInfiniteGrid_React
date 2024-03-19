import React, { PropsWithChildren } from "react";

interface Props {
  tagName?: keyof JSX.IntrinsicElements;
}

const MasonryInfiniteGrid = ({
  children,
  tagName: Wrapper = "div",
}: PropsWithChildren<Props>) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MasonryInfiniteGrid;
