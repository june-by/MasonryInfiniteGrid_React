import React from "react";

const GridItem = () => {
  const randomIdx = Math.floor(Math.random() * 3 + 1);

  return <li className={`grid_item height_${randomIdx}`}>GridItem</li>;
};

export default GridItem;
