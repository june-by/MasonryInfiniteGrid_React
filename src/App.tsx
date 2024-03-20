import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MasonryInfiniteGrid from "./components/MasonryInfiniteGrid";
import GridItem from "./components/GridItem";

function createArr(length: number) {
  return Array.from({ length }, (_, idx) => idx + 1);
}

function App() {
  const [items, setItems] = useState(createArr(20));

  const fetchNextItems = useCallback(
    () => Promise.resolve(setItems((prev) => [...prev, ...createArr(20)])),
    []
  );

  return (
    <div className="grid_container">
      <MasonryInfiniteGrid
        tagName="ul"
        className="grid_wrapper"
        resizeDebounce={500}
        fetchNext={fetchNextItems}
        hasMore={items.length < 100}
      >
        {items.map((v, index) => (
          <GridItem key={v} index={index} />
        ))}
      </MasonryInfiniteGrid>
    </div>
  );
}

export default App;
