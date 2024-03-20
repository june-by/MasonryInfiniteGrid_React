import React, {
  ElementType,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { useResize } from "../hooks";

type Props<T extends keyof JSX.IntrinsicElements> = {
  tagName?: T;
  className?: string;
} & JSX.IntrinsicElements[T];

const getNumOfGridColumn = (gridItemWidth: number) => {
  let numOfCol = 0;
  let accWidth = 0;

  while (accWidth < document.documentElement.clientWidth) {
    accWidth += gridItemWidth;
    numOfCol++;
  }

  return numOfCol || 1;
};

const MasonryInfiniteGrid = <T extends keyof JSX.IntrinsicElements>({
  children,
  tagName: Wrapper = "div" as T,
  ...rest
}: PropsWithChildren<Props<T>>) => {
  const gridWrapperRef = useRef<HTMLElement | null>(null);

  const calculateGridItemsPos = useCallback(() => {
    if (!gridWrapperRef.current) {
      return;
    }

    const gridWrapperElement = gridWrapperRef.current;

    const gridItemElements = Array.from(gridWrapperElement.children);

    // 모든 Child의 Width가 동일하다고 가정합니다.
    const childWidth = gridItemElements[0].getBoundingClientRect().width;

    // 전체 Grid Column의 개수
    const numOfCol = getNumOfGridColumn(childWidth);

    // 긱 Column 별 Height 누적 값
    const accHeightPerColumn = Array.from({ length: numOfCol }, () => 0);

    // 위치 계산
    gridItemElements.forEach((gridItemElement) => {
      const currentColIdx = accHeightPerColumn.indexOf(
        Math.min(...accHeightPerColumn)
      );

      gridItemElement.setAttribute(
        "style",
        `position : absolute; left : ${childWidth * currentColIdx}px; top : ${
          accHeightPerColumn[currentColIdx]
        }px`
      );
      accHeightPerColumn[currentColIdx] += gridItemElement.clientHeight;
    });
  }, []);

  useLayoutEffect(() => {
    const gridWrapperElement = gridWrapperRef.current;
    if (!gridWrapperElement) {
      return;
    }

    gridWrapperElement.style.visibility = "hidden";

    calculateGridItemsPos();

    gridWrapperElement.style.visibility = "";
  }, [calculateGridItemsPos]);

  useResize(calculateGridItemsPos);

  const GridWrapperComponent = Wrapper as ElementType;

  return (
    <GridWrapperComponent ref={gridWrapperRef} {...rest}>
      {children}
    </GridWrapperComponent>
  );
};

export default MasonryInfiniteGrid;
