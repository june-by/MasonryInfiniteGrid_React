import React, {
  ElementType,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useResize } from "../hooks";
import InfiniteScroll from "./InfiniteScroll";

type Props<T extends keyof JSX.IntrinsicElements> = {
  tagName?: T;
  resizeDebounce?: number;
  fetchNext?: () => Promise<void>;
  skeleton?: JSX.Element;
  hasMore?: boolean;
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
  resizeDebounce = 1000,
  hasMore = false,
  fetchNext = () => Promise.resolve(),
  skeleton,
  ...rest
}: PropsWithChildren<Props<T>>) => {
  const isInitialGridRender = useRef(true);
  const [isFetchingNextLoading, setIsFetchingNextLoading] = useState(false);
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
    gridItemElements.forEach((gridItemElement, idx) => {
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

    gridWrapperElement.style.height = `${Math.max(...accHeightPerColumn)}px`;
  }, []);

  useLayoutEffect(() => {
    if (isFetchingNextLoading && !skeleton) {
      return;
    }

    const gridWrapperElement = gridWrapperRef.current;
    if (!gridWrapperElement) {
      return;
    }

    if (isInitialGridRender.current)
      gridWrapperElement.style.visibility = "hidden";

    calculateGridItemsPos();

    if (isInitialGridRender.current) {
      gridWrapperElement.style.visibility = "";
      isInitialGridRender.current = false;
    }
  }, [calculateGridItemsPos, isFetchingNextLoading, skeleton]);

  useResize(calculateGridItemsPos, resizeDebounce);

  const GridWrapperComponent = Wrapper as ElementType;

  return (
    <InfiniteScroll
      fetchNext={() => {
        if (isFetchingNextLoading) {
          return;
        }
        setIsFetchingNextLoading(true);
        fetchNext().finally(() => setIsFetchingNextLoading(false));
      }}
      hasMore={hasMore}
    >
      <GridWrapperComponent ref={gridWrapperRef} {...rest}>
        {children}
        {isFetchingNextLoading && skeleton}
      </GridWrapperComponent>
    </InfiniteScroll>
  );
};

export default MasonryInfiniteGrid;
