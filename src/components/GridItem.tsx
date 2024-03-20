import React, { useMemo } from "react";

const COLORS = ["white", "blue", "green", "red", "yellow"];

interface Props {
  index: number;
}

const GridItem = ({ index }: Props) => {
  const randomIdx = useMemo(() => Math.floor(Math.random() * 6 + 1), []);

  return (
    <li className={`grid_item height_${randomIdx}`}>
      <div className={`grid_item_content`}>
        <div>
          <p>GirdItem{index}</p>
          <p>Group : {Math.floor(index / 20)}</p>
        </div>
      </div>
    </li>
  );
};

export default GridItem;
