import React from "react";

interface Props {
  index: number;
}

const GridItem = ({ index }: Props) => {
  const randomIdx = Math.floor(Math.random() * 3 + 1);

  return (
    <li className={`grid_item height_${randomIdx}`}>
      <div className="grid_item_content">GirdItem{index}</div>
    </li>
  );
};

export default GridItem;
