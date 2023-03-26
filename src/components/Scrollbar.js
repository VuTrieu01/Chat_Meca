import React from "react";

export default function Scrollbar(props) {
  return (
    <div className="h-full overflow-x-hidden select-none scrollbar md:h-4/5">
      <div className={`${props.sx}`}>{props.children}</div>
    </div>
  );
}
