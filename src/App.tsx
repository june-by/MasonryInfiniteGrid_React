import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MasonryInfiniteGrid from "./components/MasonryInfiniteGrid";
import GridItem from "./components/GridItem";

function createArr(length: number) {
  return Array.from({ length }, (_, idx) => idx + 1);
}

function App() {
  return (
    <MasonryInfiniteGrid>
      {createArr(20).map((v) => (
        <GridItem key={v} />
      ))}
    </MasonryInfiniteGrid>
  );
}

export default App;
