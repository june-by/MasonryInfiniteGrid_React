import React, { ElementType, PropsWithChildren, useRef } from "react";

type Props<T extends keyof JSX.IntrinsicElements> = {
  tagName?: T;
  className?: string;
} & JSX.IntrinsicElements[T];

const MasonryInfiniteGrid = <T extends keyof JSX.IntrinsicElements>({
  children,
  tagName: Wrapper = "div" as T,
  ...rest
}: PropsWithChildren<Props<T>>) => {
  const gridWrapperRef = useRef<any>(null);

  const GridWrapperComponent = Wrapper as ElementType;

  return (
    <GridWrapperComponent ref={gridWrapperRef} {...rest}>
      {children}
    </GridWrapperComponent>
  );
};

export default MasonryInfiniteGrid;
