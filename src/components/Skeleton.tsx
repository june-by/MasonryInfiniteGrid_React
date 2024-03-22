import React from "react";
import { createArr } from "../App";

const Skeleton = () => {
  return (
    <>
      {createArr(20).map((v) => (
        <div className="skeleton_wrap" key={`skeleton${v}`}>
          <div className="skeleton_content" />
        </div>
      ))}
    </>
  );
};

export default Skeleton;
