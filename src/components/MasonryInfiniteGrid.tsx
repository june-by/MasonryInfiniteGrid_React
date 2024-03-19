import React, { PropsWithChildren } from "react";

interface Props {
  tagName?: keyof JSX.IntrinsicElements;
  className?: string;
}

const MasonryInfiniteGrid = ({
  children,
  tagName: Wrapper = "div",
  ...rest
}: PropsWithChildren<Props>) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default MasonryInfiniteGrid;
