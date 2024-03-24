import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MasonryInfiniteGrid from "./components/MasonryInfiniteGrid";
import GridItem from "./components/GridItem";
import Skeleton from "./components/Skeleton";

export function createArr(length: number, groupNo?: number) {
  return Array.from({ length }, (_, idx) => {
    return {
      idx,
      group: `${groupNo ? `group${groupNo}` : "skeleton"}`,
    };
  });
}

function App() {
  const [currentGroupNo, setCurrentGroupNo] = useState(1);
  const [isGridRenderComplete, setIsGridRenderComplete] = useState(false);
  const [items, setItems] = useState(createArr(20, currentGroupNo));

  const fetchNextItems = useCallback(async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => {
      setItems((prev) => [...prev, ...createArr(20, currentGroupNo)]);
    });
  }, [currentGroupNo]);

  const changeItems = () => {
    const nextGroupNo = currentGroupNo + 1;
    setIsGridRenderComplete(false);
    setCurrentGroupNo(nextGroupNo);
    setItems(createArr(20, nextGroupNo));
  };

  useEffect(() => {
    console.log("isGridRenderComplete : ", isGridRenderComplete);
  }, [isGridRenderComplete]);

  return (
    <>
      <button onClick={changeItems}>ChangeItems</button>
      <div className="grid_container">
        <MasonryInfiniteGrid
          tagName="ul"
          className="grid_wrapper"
          useTransform
          resizeDebounce={500}
          fetchNext={fetchNextItems}
          hasMore={items.length < 100}
          onGridRenderComplete={() => setIsGridRenderComplete(true)}
          skeleton={<Skeleton />}
        >
          {items.map((v, index) => (
            <GridItem key={v.idx} index={index} group={v.group} />
          ))}
        </MasonryInfiniteGrid>
      </div>
    </>
  );
}

export default App;
