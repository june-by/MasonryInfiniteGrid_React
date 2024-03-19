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
    <MasonryInfiniteGrid tagName="ul" className="grid_wrapper">
      {createArr(20).map((v, index) => (
        <GridItem key={v} index={index} />
      ))}
    </MasonryInfiniteGrid>
  );
}

export default App;
